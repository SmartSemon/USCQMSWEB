/**
 * @author lwp
 */
import React from 'react'
import { Modal, Button, Tree, Row, Col, Card } from 'antd/lib/index'
import CodeStandardForm from './CodeStandardForm'
import { ergodicRoot } from '../../../../utils/utils'
import PropertyForm from '../../engine/property/PropertyForm'

const { TreeNode } = Tree
const CodeStandard = ({
  list,
  record,
  onCancel,
  visible,
  showModel,
  editModel,
  createType,
  itemList,
  onSelect,
  selectRow
}) => {
  let pageFieldList = []
  let pageFieldList0 = [
    { editor: 'TextBox', name: '名称', no: 'NAME' },
    { editor: 'TextBox', name: '所属对象', no: 'OBJECT' },
    { editor: 'TextBox', name: '编码类型', no: 'TYPE' }
  ]
  let pageFieldList1 = [
    { editor: 'TextBox', name: '名称', no: 'NAME' },
    { editor: 'TextBox', name: '所属对象', no: 'OBJECT' },
    { editor: 'TextBox', name: '编码类型', no: 'TYPE' },
    { editor: 'TextBox', name: '编码', no: 'PREFIX' },
    { editor: 'TextBox', name: '连接符', no: 'CONNECTOR' },
    { editor: 'TextBox', name: '起始码', no: 'STARTCODE' },
    { editor: 'TextBox', name: '终止码', no: 'ENDCODE' }
  ]
  let pageFieldList2 = [
    { editor: 'TextBox', name: '名称', no: 'NAME' },
    { editor: 'TextBox', name: '所属对象', no: 'OBJECT' },
    { editor: 'TextBox', name: '编码类型', no: 'TYPE' },
    { editor: 'TextBox', name: '编码段长', no: 'CODE_SEGMENT' },
    { editor: 'TextBox', name: '分类码', no: 'PREFIX' },
    { editor: 'TextBox', name: '备注', no: 'REMARK', allowNull: true }
  ]
  if (selectRow && selectRow.DATATYPE === 0) {
    pageFieldList = pageFieldList0
  } else if (selectRow && selectRow.DATATYPE === 1) {
    pageFieldList = pageFieldList1
  } else if (selectRow && selectRow.DATATYPE === 2) {
    pageFieldList = pageFieldList2
  }
  let newList = ergodicRoot(list)
  const generateTree = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode key={item.ID} title={item.NAME} dataRef={item}>
            {generateTree(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode key={item.ID} title={item.NAME} dataRef={item} />
    })
  return (
    <div>
      <div style={{ marginBottom: 5, marginTop: 5 }}>
        <Button style={{ marginLeft: 5 }} type={'primary'} onClick={() => showModel(0)}>
          新建编码组
        </Button>
        <Button style={{ marginLeft: 5 }} type={'primary'} onClick={() => showModel(1)}>
          新建分类码
        </Button>
        <Button style={{ marginLeft: 5 }} type={'primary'} onClick={() => showModel(2)}>
          新建流水码
        </Button>
        <Button style={{ marginLeft: 5 }} type={'primary'} onClick={editModel}>
          修改
        </Button>
      </div>
      <Row>
        <Col span={6}>
          <Card title='编码分类' bordered={false}>
            <Tree onSelect={onSelect}>{generateTree(newList)}</Tree>
          </Card>
        </Col>
        <Col span={18}>
          <Card title='编码详情' bordered={false}>
            {selectRow ? (
              <div style={{ width: '100%' }}>
                <PropertyForm columns={2} pageFieldList={pageFieldList} showBtn={false} record={selectRow} />
              </div>
            ) : (
              ''
            )}
          </Card>
        </Col>
      </Row>
      <Modal
        width={600}
        title='编码规范'
        visible={visible}
        onCancel={onCancel}
        destroyOnClose='true'
        footer={null}
        centered={true}
        mask={false}
        maskClosable={false}
      >
        <CodeStandardForm record={record} createType={createType} itemList={itemList} />
      </Modal>
    </div>
  )
}
export default CodeStandard
