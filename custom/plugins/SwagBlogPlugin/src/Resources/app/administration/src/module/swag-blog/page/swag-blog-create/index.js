const { Context } = Shopware;

export default {
    data() {
        return {
            isLoading: false,
            isSaveSuccessful: false,
        };
    },

    computed: {
        isCreateMode() {
            return true; 
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        async loadEntity() {
            this.isLoading = true;
            try {
                const entity = this.blogRepository.create(Context.api);
                entity.errors = {};
                entity.publishedAt = null;
                this.blog = entity; this.blog = entity;
            } catch (error) {
                console.error('Failed to load blog data:', error);
                this.createNotificationError({ message: 'Failed to load blog data.' });
            } finally {
                this.isLoading = false;
            }

        },
        async onSave() {
            if (!this.validateBlog()) return; 

            this.isLoading = true;

            try {
                await this.blogRepository.save(this.blog, Context.api);
                this.isSaveSuccessful = true;
                this.createNotificationSuccess({ message: 'Blog created successfully.' });
                this.$router.push({ name: 'swag.blog.detail', params: { id: this.blog.id } });
            } catch (error) {
                console.error('Blog creation failed:', error);
                this.createNotificationError({ message: 'Failed to create blog.' });
            } finally {
                this.isLoading = false;
            }
        },
    },
};
