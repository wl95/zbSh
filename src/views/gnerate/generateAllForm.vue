<template>
  <a-card :bordered="false">
    <a-steps class="steps" :current="currentTab">
      <a-step title="EfModel基础信息" />
      <a-step title="EfModel属性信息" />
      <a-step title="生成Dto" />
      <a-step title="生成ViewModel" />
      <a-step title="生成代码" />
    </a-steps>
    <div class="content">
      <keep-alive>
        <step1 :id="id" v-if="currentTab === 0" @nextStep="nextStep" />
        <step2 :id="id" v-if="currentTab === 1" @nextStep="nextStep" @prevStep="prevStep" />
        <step3 :id="id" v-if="currentTab === 2" @nextStep="nextStep" @prevStep="prevStep" />
        <step4 :id="id" v-if="currentTab === 3" @nextStep="nextStep" @prevStep="prevStep" />
        <step5 :id="id" v-if="currentTab === 4" @prevStep="prevStep" @finish="finish" />
      </keep-alive>
    </div>
  </a-card>
</template>

<script>
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'

export default {
  name: 'StepForm',
  components: {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5
  },
  data() {
    return {
      description: '将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。',
      currentTab: 0,
      form: null,
      Step1Form: {},
      Step2Form: {},
      Step3Form: {},
      Step4Form: {},
      id: 0
    }
  },
  created() {
    this.id = this.$route.query.id
  },
  methods: {
    // handler
    nextStep() {
      if (this.currentTab < 4) {
        this.currentTab += 1
      }
    },
    prevStep() {
      if (this.currentTab > 0) {
        this.currentTab -= 1
      }
    },
    finish() {
      this.currentTab = 0
    }
  }
}
</script>

<style lang="less" scoped>
.steps {
  max-width: 750px;
  margin: 16px auto;
}
</style>
