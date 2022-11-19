<template>
    <div>
        <form ref="form" class="overflow-hidden" action=""
            enctype="multipart/form-data" method="post">
            <div class="form-group">
                <div class="text-center relative py-12 mb-4 border-2 hover:bg-gray-100 custom-font-14 rounded"
                    id="fileInput">
                    <span v-text="fileName"></span>
                    <input ref="" type="file" id="inputFile" name="inputFile" @change="selectFile"
                        style="opacity: 0;position: absolute;cursor: pointer;width: 100%;height: 100%;left: 0;top: 0;">
                </div>
            </div>
            <select id="outputFormat" name="outputFormat" required>
                <option v-for="(item, index) in formatTable.Text" :value="item.value">{{ item.name }}</option>
            </select>
        </form>
    </div>
</template>
<script setup lang="ts">


let formatTable = {
    Text: [
        { name: "Hypertext Markup Language (html)", value: "html" },
        { name: "Extensible Hypertext Markup Language (xhtml)", value: "xhtml" },
        { name: "Portable Document Format (pdf)", value: "pdf" },
        { name: "OpenDocument Text (odt)", value: "odt" },
        { name: "OpenOffice.org 1.0 Text Document (sxw)", value: "sxw" },
        { name: "Microsoft Word 97-2003 (doc)", value: "doc" },
        { name: "Microsoft Word 2007-2013 (docx)", value: "docx" },
        { name: "Rich Text Format (rtf)", value: "rtf" },
        { name: "Plain Text (txt)", value: "txt" },
        { name: "Portable Network Graphics (png)", value: "png" },
    ],

    Spreadsheet: [
        { name: "Portable Document Format (pdf)", value: "pdf" },
        { name: "OpenDocument Spreadsheet (ods)", value: "ods" },
        { name: "OpenOffice.org 1.0 Spreadsheet (sxc)", value: "sxc" },
        { name: "Microsoft Excel 97-2003 (xls)", value: "xls" },
        { name: "Microsoft Excel 2007-2013 (xlsx)", value: "xlsx" },
        { name: "Comma-Separated Values (csv)", value: "csv" },
        { name: "Portable Network Graphics (png)", value: "png" },
    ],

    Presentation: [
        { name: "Portable Document Format (pdf)", value: "pdf" },
        { name: "Macromedia Flash (swf)", value: "swf" },
        { name: "OpenDocument Presentation (odp)", value: "odp" },
        { name: "OpenOffice.org 1.0 Presentation (sxi)", value: "sxi" },
        { name: "Microsoft PowerPoint 97-2003 (ppt)", value: "ppt" },
        { name: "Microsoft PowerPoint 2007-2013 (pptx)", value: "pptx" },
        { name: "Portable Network Graphics (png)", value: "png" },
    ],

    Drawing: [
        { name: "Portable Document Format (pdf)", value: "pdf" }
    ]
};

const fileName = ref("拖拽文件到这里或者点击选择文件")
const form = ref<HTMLFormElement>(null)


async function selectFile(e) {
    if (e.target.files.length > 0) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = async (evt: any) => {
            fileName.value = (file.name);
            let formData = new FormData();
            formData.append("inputFile", file)
            formData.append("outputFormat", "pdf")
        };
        file && reader.readAsArrayBuffer(file);

    }
}
onMounted(() => {
    document.body.style.overflowY = "auto"
    window.addEventListener("message", function (event) {
        var data = event.data;
        form.value.action = data.params.url + "/"+ fileName.value.substring(0, fileName.value.lastIndexOf("."))
        console.log(data);
        switch (data.cmd) {
            case 'download':
                console.log();
                // 处理业务逻辑
                form.value.submit()
                break;
        }
    });
})

definePageMeta({
    layout: "empty"
})
</script>
<style>
/* body {
    overflow-y: auto;
} */
</style>