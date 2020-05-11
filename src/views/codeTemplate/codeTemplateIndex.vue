<template>
  <page-view>
    <div>
      <div class="addbutton">
        <a-button type="primary" icon="plus" @click="$refs.addTemplate.add()">新建</a-button>
      </div>
      <a-card :bordered="false" class="ant-pro-components-tag-select">
        <a-form :form="form" layout="inline">
          <standard-form-row title="所属类别" block style="padding-bottom: 11px;">
            <a-form-item>
              <template v-for=" tag in categoryVms">
                <a-checkable-tag :key="tag.id" :checked="selectedCategoryTags==tag.id" @change="handleChange(tag)">
                  {{ tag.name }}
                </a-checkable-tag>
              </template>
            </a-form-item>
          </standard-form-row>
          <standard-form-row title="所属标签" grid last>
            <a-form-item>
              <template v-for=" label in labelVms">
                <a-checkable-tag :key="label.id" :checked="selectedlabelTags==label.id" @change="handleChangeLabel(label)">
                  {{ label.name }}
                </a-checkable-tag>
              </template>
            </a-form-item>
          </standard-form-row>
        </a-form>
      </a-card>

      <div class="ant-pro-pages-list-projects-cardList">
        <a-list :loading="loading" :data-source="data" :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card class="ant-pro-pages-list-projects-card" hoverable>
              <img slot="cover" :src="item.imgUrl" :alt="item.title" />
              <a-card-meta :title="item.name">
                <template slot="description">
                  <ellipsis :length="50">{{ item.label }}</ellipsis>
                </template>
              </a-card-meta>
              <div class="cardItemContent">
                <span>{{ item.languageType }}</span>
                <a-button type="primary" icon="edit" @click="$refs.addTemplate.edit(item.id)">编辑</a-button>
                <!-- <div class="avatarList">
                <avatar-list size="mini">
                  <avatar-list-item v-for="(member, i) in item.members" :key="`${item.id}-avatar-${i}`" :src="member.avatar" :tips="member.name" />
                </avatar-list>
              </div> -->
              </div>
            </a-card>
          </a-list-item>
        </a-list>
      </div>
    </div>
    <add-template ref="addTemplate" @ok="handleAddProperty" />
  </page-view>
</template>

<script>
import AddTemplate from './addTemplate'
import moment from 'moment'
import { TagSelect, StandardFormRow, Ellipsis, AvatarList } from '@/components'
import { ajax } from '@/utils/ajax'
import { PageView } from '@/layouts'
const TagSelectOption = TagSelect.Option
const AvatarListItem = AvatarList.AvatarItem

export default {
  components: {
    AvatarList,
    AvatarListItem,
    Ellipsis,
    TagSelect,
    TagSelectOption,
    StandardFormRow,
    PageView,
    AddTemplate
  },
  data() {
    return {
      data: [],
      form: this.$form.createForm(this),
      loading: true,
      categoryVms: [],
      labelVms: [],
      selectedCategoryTags: '',
      selectedlabelTags: ''
    }
  },
  filters: {
    fromNow(date) {
      return moment(date).fromNow()
    }
  },
  mounted() {
    var that = this
    ajax.get('/api/CodeTemplateSetting/GetCodeTemplateSettingVm').then(res => {
      that.categoryVms = res.result.categoryVms
      that.labelVms = res.result.labelVms
    })
    this.getList()
  },
  methods: {
    handleChange(tag) {
      this.selectedCategoryTags = tag.id
      this.getList()
    },
    handleAddProperty(data) {
      var that = this
      ajax.postSuccessCall(
        'api/CodeTemplateSetting/AddTemplate',
        data,
        function(response) {
          that.getList()
        },
        that
      )
    },
    handleChangeLabel(label) {
      this.selectedlabelTags = label.id
      this.getList()
    },
    getList() {
      var that = this
      ajax.postSuccessCall(
        'api/CodeTemplateSetting/GetTemplateList',
        {
          categoryId: that.selectedCategoryTags,
          tagId: that.selectedlabelTags
        },
        function(response) {
          that.data = response.result
        },
        that
      )
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-components-tag-select {
  /deep/ .ant-pro-tag-select .ant-tag {
    margin-right: 24px;
    padding: 0 8px;
    font-size: 14px;
  }
}
.ant-pro-pages-list-projects-cardList {
  margin-top: 24px;

  /deep/ .ant-card-meta-title {
    margin-bottom: 4px;
  }

  /deep/ .ant-card-meta-description {
    height: 44px;
    overflow: hidden;
    line-height: 22px;
  }

  .cardItemContent {
    display: flex;
    height: 20px;
    margin-top: 16px;
    margin-bottom: -4px;
    line-height: 20px;

    > span {
      flex: 1 1;
      color: rgba(0, 0, 0, 0.45);
      font-size: 12px;
    }

    /deep/ .ant-pro-avatar-list {
      flex: 0 1 auto;
    }
  }
}
.addbutton {
  text-align: right;
  margin-bottom: 20px;
}
</style>
