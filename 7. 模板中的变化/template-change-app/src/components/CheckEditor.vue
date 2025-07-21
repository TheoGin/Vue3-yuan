<template>
  <div class="check-editor">
    <div class="check-editor-inner">
      <div
        class="checkbox"
        :class="{ checked: modelValue }"
        @click="handleChecked"
      ></div>
      <input
        type="text"
        class="editor"
        :value="title"
        @input="handleTextInput"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    modelValue: Boolean,
    titleModifiers: {
    //   default: () => {}, // 默认值为空对象
      default: () => ({}), // 默认值为空对象，括号可加可不加
    },
  },
  name: "CheckEditor",
  setup(props, ctx) {
    const handleTextInput = (e) => {
      let value = e.target.value;
      if (props.titleModifiers && props.titleModifiers.trim) {
        value = value.trim();
      }
      ctx.emit("update:title", value);
    };

    const handleChecked = () => {
      ctx.emit("update:modelValue", !props.modelValue);
    };


    return {
      handleTextInput,
      handleChecked,
    };
  },
};
</script>

<style scoped>
.check-editor {
  cursor: pointer;
}

.check-editor-inner {
  display: flex;
  align-items: center;
}

.checkbox {
  width: 15px;
  height: 15px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  border-radius: 3px;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox:hover,
.checkbox.checked {
  border-color: #409eff;
}

.checkbox.checked::after {
  content: "";
  border-radius: 2px;
  width: 9px;
  height: 9px;
  background: #409eff;
}

.editor {
  border: none;
  outline: none;
  margin-left: 5px;
  border-bottom: 1px solid #dcdfe6;
  font-size: inherit;
}
</style>
