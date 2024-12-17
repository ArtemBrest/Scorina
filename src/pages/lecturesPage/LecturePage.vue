<template>
    <div class="lecture-page">
        <Ckeditor
            v-model="editorData"
            :editor="editor"
            :config="editorConfig"
        />
        <div
            class="lecture-page__content"
            v-html="editorData"
        ></div>
    </div>
</template>

<script setup lang="ts">
    import {Ckeditor} from '@ckeditor/ckeditor5-vue';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

    const editor = ClassicEditor;

    const editorData = ref('<p>Write your lecture content here...</p>');
    const editorConfig = ref({
        licenseKey: 'GPL',
        toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'code',
            'link',
            'bulletedList',
            'numberedList',
            'blockQuote',
            '|',
            'insertTable',
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            '|',
            'mediaEmbed',
            '|',
            'undo',
            'redo',
            'alignment',
            '|',
            'fontSize',
            'fontFamily',
            'fontColor',
            'fontBackgroundColor',
            'highlight',
            '|',
            'sourceEditing',
        ],
        language: 'ru',
        placeholder: 'Start typing your lecture content...',
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells',
            ],
        },
        mediaEmbed: {
            previewsInData: true,
        },
    });
</script>

<style scoped lang="scss">
    @import "./styles/lecturePage/lecture-page";
    @import '@ckeditor/ckeditor5-theme-lark/theme/index.css';
</style>
