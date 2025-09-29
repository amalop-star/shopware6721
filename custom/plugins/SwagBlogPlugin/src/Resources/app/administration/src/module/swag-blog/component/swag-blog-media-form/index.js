/*
 * @sw-package blog
 */

import template from './swag-blog-media-form.html.twig';
import './swag-blog-media-form.scss';

const { Component, Mixin } = Shopware;
const { mapGetters } = Component.getComponentHelper();

export default {
    template,

    compatConfig: Shopware.compatConfig,

    inject: [
        'repositoryFactory',
        'systemConfigApiService',
    ],

    emits: ['media-open'],

    mixins: [
        Mixin.getByName('notification'),
    ],

    props: {
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },

        isInherited: {
            type: Boolean,
            required: false,
            default: false,
        },

        fileAccept: {
            type: String,
            required: false,
            default: '*/*',
        },
    },

    data() {
        return {
            showCoverLabel: true,
            isMediaLoading: false,
            columnCount: 5,
            columnWidth: 90,
            globalIsArReady: false,
        };
    },

    computed: {
        blog() {
            const state = Shopware.State.get('swBlogDetail');

            if (this.isInherited) {
                return state.parentBlog;
            }

            return state.blog;
        },

        mediaItems() {
            const mediaItems = this.blogMedia.slice();
            const placeholderCount = this.getPlaceholderCount(this.columnCount);

            if (placeholderCount === 0) {
                return mediaItems;
            }

            for (let i = 0; i < placeholderCount; i += 1) {
                mediaItems.push(this.createPlaceholderMedia(mediaItems));
            }
            return mediaItems;
        },

        cover() {
            if (!this.blog) return null;
            const coverId = this.blog.mainImage ? this.blog.mainImage.id : this.blog.mainImageId;
            return this.blog.gallery.find((media) => media.id === coverId);
        },

        ...mapGetters('swBlogDetail', {
            isStoreLoading: 'isLoading',
        }),

        isLoading() {
            return this.isMediaLoading || this.isStoreLoading;
        },

        blogMediaRepository() {
            return this.repositoryFactory.create('swag_blog_media');
        },

        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        blogMedia() {
            if (!this.blog) return [];
            return this.blog.gallery || [];
        },

        gridAutoRows() {
            return `grid-auto-rows: ${this.columnWidth}`;
        },
    },

    created() {
        this.onCreated();
    },

    methods: {
        onCreated() {
            this.systemConfigApiService
                .getValues('core.media')
                .then((response) => {
                    this.globalIsArReady = response['core.media.defaultEnableAugmentedReality'];
                })
                .catch((error) => {
                    throw error;
                });
        },

        onOpenMedia() {
            this.$emit('media-open');
        },

        getPlaceholderCount(columnCount) {
            if (this.blogMedia.length + 3 < columnCount * 2) {
                columnCount *= 2;
            }

            let placeholderCount = columnCount;
            if (this.blogMedia.length !== 0) {
                placeholderCount = columnCount - (this.blogMedia.length % columnCount);
                if (placeholderCount === columnCount) return 0;
            }

            return placeholderCount;
        },

        createPlaceholderMedia(mediaItems) {
            return {
                isPlaceholder: true,
                media: { isPlaceholder: true, name: '' },
                mediaId: mediaItems.length.toString(),
            };
        },

        async successfulUpload({ targetId }) {
            const existingMedia = this.blog.gallery.find((media) => media.mediaId === targetId);

            if (existingMedia) {
                const mediaItem = await this.mediaRepository.get(targetId);
                const blogMedia = this.createMediaAssociation(targetId);
                blogMedia.media = mediaItem;

                const existingWasCover = this.blog.mainImage?.id === existingMedia.id;

                this.blog.gallery.remove(existingMedia.id);
                this.blog.gallery.add(blogMedia);

                if (existingWasCover) {
                    this.blog.mainImageId = blogMedia.id;
                    this.blog.mainImage = blogMedia;
                }
                return;
            }

            const blogMedia = this.createMediaAssociation(targetId);
            this.blog.gallery.add(blogMedia);
        },

        createMediaAssociation(targetId) {
            const blogMedia = this.blogMediaRepository.create();
            blogMedia.blogId = this.blog.id;
            blogMedia.mediaId = targetId;

            blogMedia.position = this.blog.gallery.length;
            if (this.blog.gallery.length === 0) {
                this.blog.mainImageId = blogMedia.id;
            }

            return blogMedia;
        },

        onUploadFailed(uploadTask) {
            const toRemove = this.blog.gallery.find((media) => media.mediaId === uploadTask.targetId);
            if (toRemove) {
                if (this.blog.mainImageId === toRemove.id) {
                    this.blog.mainImageId = null;
                }
                this.blog.gallery.remove(toRemove.id);
            }
        },

        removeFile(mediaItem) {
            if (this.blog.mainImageId === mediaItem.id) {
                this.blog.mainImage = null;
                this.blog.mainImageId = null;
            }

            if (!this.blog.mainImageId && this.blog.gallery.length > 0) {
                this.blog.mainImageId = this.blog.gallery.first().id;
            }

            this.blog.gallery.remove(mediaItem.id);
        },

        markMediaAsCover(mediaItem) {
            this.blog.mainImage = mediaItem;
            this.blog.mainImageId = mediaItem.id;

            this.blog.gallery.moveItem(mediaItem.position, 0);
            this.updateMediaItemPositions();
        },

        onMediaItemDragSort(dragData, dropData, validDrop) {
            if (!validDrop) return;

            if ((dragData.id === this.blog.mainImageId && dragData.position === 0) ||
                (dropData.id === this.blog.mainImageId && dropData.position === 0)) {
                return;
            }

            this.blog.gallery.moveItem(dragData.position, dropData.position);
            this.updateMediaItemPositions();
        },

        updateMediaItemPositions() {
            this.blog.gallery.forEach((medium, index) => {
                medium.position = index;
            });
        },

        isCover(mediaItem) {
            return mediaItem.id === this.blog.mainImageId;
        },

        isSpatial(mediaItem) {
            return mediaItem.media?.fileExtension === 'glb' || !!mediaItem.media?.url?.endsWith('.glb');
        },

        isArReady(mediaItem) {
            return mediaItem.media?.config?.spatial?.arReady ?? this.globalIsArReady;
        },
    },
};
