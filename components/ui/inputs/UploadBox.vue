<template>
  <div
    class="upload-box"
    :class="{ 'drag-over': isDragOver }"
    @dragover.prevent="isDragOver = true"
    @dragleave.prevent="isDragOver = false"
    @drop.prevent="handleDrop"
  >
    <div class="upload-icon" v-if="!files.length">
      <icon name="humbleicons:upload" :size="36" />
    </div>

    <p class="upload-text" v-html="text" v-if="!files.length" />

    <div class="file-list" v-if="files.length">
      <div class="file-item" v-for="(entry, i) in files" :key="i">
        <div class="file_item__icon">
          <icon :name="getIcon(entry.file)" :size="100" />
        </div>
        <div class="file-details">
          <span class="file-name">{{ entry.file.name }}</span>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: entry.progress + '%' }"></div>
          </div>
          <div class="progress-label">{{ entry.progress }}%</div>
        </div>
        <button type="button" class="remove-btn" @click="removeFile(i)">
          <icon name="mdi:close" />
        </button>
      </div>
    </div>

    <button type="button" class="upload-btn" @click="input?.click()">+</button>
    <input
      ref="input"
      type="file"
      class="hidden"
      :accept="accept"
      multiple
      @change="handleUpload"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  text: string;
  accept: string;
  maxSizeKb?: number;
}>();

const emit = defineEmits<{
  (e: "file-selected", files: File[]): void;
}>();

const input = ref<HTMLInputElement | null>(null);
const files = ref<{ file: File; progress: number }[]>([]);

const isDragOver = ref(false);

function handleUpload(event: Event) {
  const inputFiles = (event.target as HTMLInputElement).files;
  if (!inputFiles) return;
  processFiles(Array.from(inputFiles));
}

function handleDrop(event: DragEvent) {
  isDragOver.value = false;
  const droppedFiles = event.dataTransfer?.files;
  if (!droppedFiles) return;
  processFiles(Array.from(droppedFiles));
}

function processFiles(selectedFiles: File[]) {
  const validFiles = selectedFiles.filter((f) => {
    if (props.maxSizeKb && f.size > props.maxSizeKb * 4096) {
      alert(`Файл ${f.name} превышает ${props.maxSizeKb} КБ`);
      return false;
    }
    return true;
  });

  const newFiles = validFiles.map((file) => ({ file, progress: 0 }));
  files.value.push(...newFiles);

  newFiles.forEach((f) => simulateUpload(f));
  emit(
    "file-selected",
    files.value.map((f) => f.file)
  );
}

function simulateUpload(fileEntry: { file: File; progress: number }) {
  const index = files.value.findIndex((f) => f.file === fileEntry.file);
  if (index === -1) return;

  const uploadDuration = 2000 + Math.random() * 2000;
  const step = 100;
  const totalSteps = Math.floor(uploadDuration / step);
  let currentStep = 0;

  const interval = setInterval(() => {
    currentStep++;
    const percent = Math.min(100, Math.round((currentStep / totalSteps) * 100));

    // Обновляем реактивно через массив
    files.value[index] = {
      ...files.value[index],
      progress: percent,
    };

    if (percent >= 100) {
      clearInterval(interval);
    }
  }, step);
}

function removeFile(index: number) {
  files.value.splice(index, 1);
  emit(
    "file-selected",
    files.value.map((f) => f.file)
  );
}

function getIcon(file: File): string {
  const type = file.type;
  if (type.includes("pdf")) return "teenyicons:pdf-solid";
  if (type.includes("jpeg") || type.includes("jpg")) return "mdi:file-jpeg-box";
  if (type.includes("png")) return "teenyicons:png-solid";
  return "teenyicons:doc-solid";
}
</script>

<style scoped lang="scss">
.upload-box {
  border: 0.1rem dashed #ccc;
  border-radius: 8px;
  padding: 2.6rem;
  text-align: center;
  width: 100%;
  position: relative;
  transition: 0.2s;
}

.upload-box.drag-over {
  border-color: #0066d6;
  background-color: #f0f8ff;
}

.upload-icon {
  margin-bottom: 12px;
  color: #666;
}

.upload-text {
  font-size: 14px;
  color: #333;
  margin-bottom: 16px;
  white-space: pre-line;
}

.upload-btn {
  background-color: #0066d6;
  color: #fff;
  font-size: 18px;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.hidden {
  display: none;
}

.file-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  grid-gap: 2rem;
  margin-bottom: 2rem;
}

.file-item {
  @include flex-start;
  font-size: 1.4rem;
  background-color: #f5f5f5;
  padding-right: 2.5rem;
  position: relative;
  border-radius: 0.5rem;
}

.file-name {
  flex: 1;
  text-align: left;
  word-break: break-word;
}

.remove-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: red;
  cursor: pointer;
}

.file_item__icon {
  color: $blue;
  @include flex-center;
}

.file-details {
  flex: 1;
  padding: 1rem 0;
}

.progress-bar {
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.progress-fill {
  height: 100%;
  background-color: #2196f3;
  transition: width 0.3s ease;
}

.progress-label {
  font-size: 12px;
  margin-top: 4px;
  color: #555;
}
</style>
