<template>
    <div class="lecture-page">
        <Breadcrumbs :items="breadcrumbsItems" />

        <Ckeditor
            v-if="false"
            v-model="editorData"
            :editor="editor"
            :config="editorConfig"
            class="lecture-page__editor"
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
    import type {Breadcrumb} from '~/components/breadcrumbs/types/Breadcrumb';

    const currentRoute = useRoute();
    const breadcrumbsItems = computed<Breadcrumb[]>(() => [
        {
            to: '/disciplines/',
            title: 'Дисциплины',
        },
        {
            to: `/disciplines/${Number(currentRoute.params.disciplineId)}/modules/`,
            title: 'Модули',
        },
        {
            to: `/disciplines/${Number(currentRoute.params.disciplineId)}/modules/${Number(currentRoute.params.moduleId)}/`,
            title: 'Лекции',
        },
        {
            title: String(currentRoute.matched[0].meta.title) || '',
        },
    ]);

    const editor = ClassicEditor;

    const editorData = ref(`
      <h2>Введение</h2>
      <p>
        Программирование — это процесс создания программ, представляющих собой набор инструкций, которые компьютер выполняет для решения определенных задач. Алгоритмизация является важной частью программирования, так как помогает структурировать и описать процесс решения задачи.
      </p>

      <h2>Основные понятия программирования</h2>
      <ul>
        <li><b>Программа</b> — набор инструкций для выполнения компьютером.</li>
        <li><b>Алгоритм</b> — последовательность действий для достижения определенного результата.</li>
        <li><b>Язык программирования</b> — средство общения с компьютером, включающее синтаксис и семантику.</li>
      </ul>

      <h3>Типы данных</h3>
      <p>Тип данных определяет множество значений и операции, которые можно с ними выполнять.</p>
      <ul>
        <li><b>Числовые</b>: целые (int), вещественные (float, double).</li>
        <li><b>Логические</b>: true или false (boolean).</li>
        <li><b>Строковые</b>: набор символов (string).</li>
        <li><b>Составные</b>: массивы, структуры.</li>
      </ul>

      <h3>Основные алгоритмические конструкции</h3>
      <ol>
        <li><b>Последовательность</b> — выполнение действий друг за другом.</li>
        <li><b>Ветвление</b> — выполнение различных блоков кода в зависимости от условий (if-else).</li>
        <li><b>Цикл</b> — повторение действий до выполнения условия (for, while).</li>
      </ol>

      <h3>Пример алгоритма</h3>
      <pre>
        <code>
          // Программа для нахождения суммы чисел от 1 до N
          let sum = 0;
          let n = 10;
          for (let i = 1; i <= n; i++) {
              sum += i;
          }
          console.log("Сумма чисел от 1 до " + n + " равна " + sum);
        </code>
      </pre>

      <iframe width="560" height="315" src="https://www.youtube.com/embed/ZV8fNtV1mOM?si=ZxJ3NLiAbjQsjNmN&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

      <table>
         <tbody>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
          <tr>
            <td>Ernst Handel</td>
            <td>Roland Mendel</td>
            <td>Austria</td>
          </tr>
          <tr>
            <td>Island Trading</td>
            <td>Helen Bennett</td>
            <td>UK</td>
          </tr>
          <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Yoshi Tannamuri</td>
            <td>Canada</td>
          </tr>
          <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
          </tr>
        </tbody>
    </table>

      <h2>Заключение</h2>
      <p>
        Изучение основ программирования и алгоритмизации является ключевым шагом к пониманию разработки программного обеспечения. Важно освоить принципы написания алгоритмов и научиться применять основные структуры программирования на практике.
      </p>

      <h2>Полезные ссылки</h2>
      <ul>
        <li><a href="https://developer.mozilla.org/ru/docs/Learn/JavaScript" target="_blank">MDN Web Docs по JavaScript</a></li>
        <li><a href="https://www.w3schools.com/" target="_blank">Учебные материалы по программированию на W3Schools</a></li>
      </ul>
    `);

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
</style>
