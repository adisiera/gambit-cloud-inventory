import { useMemo } from 'react'
import {
  Badge,
  Card,
  Text,
  mergeClasses,
  tokens,
} from '@fluentui/react-components'
import {
  Apps24Regular,
  CloudDatabaseRegular,
} from '@fluentui/react-icons'
import {
  Background,
  Controls,
  Handle,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import type { Application, Resource } from '../types'
import {
  APPLICATION_NODE_SIZE,
  GRAPH_HEIGHT,
  RESOURCE_NODE_HEIGHT,
  RESOURCE_NODE_WIDTH,
  useApplicationGraphStyles,
} from '../styles/ApplicationGraph.styles'

interface ApplicationGraphProps {
  application: Application
  resources: Resource[]
}

type ApplicationFlowNode = Node<
  { label: string; resourceCount: number },
  'application'
>

type ResourceFlowNode = Node<
  { resource: Resource; handlePosition: Position },
  'resource'
>

type GraphNode = ApplicationFlowNode | ResourceFlowNode

const GRAPH_WIDTH = 760

export const ApplicationGraph = ({
  application,
  resources,
}: ApplicationGraphProps) => {
  const styles = useApplicationGraphStyles()

  const { nodes, edges } = useMemo(
    () => createGraph(application, resources),
    [application, resources],
  )

  return (
    <div className={styles.shell}>
      <div
        className={styles.graph}
        role="img"
        aria-label={`${application.name} application graph with ${resources.length} connected resources. The graph can be panned and zoomed.`}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.12 }}
          minZoom={0.65}
          maxZoom={1.5}
          nodesConnectable={false}
          nodesFocusable
          edgesFocusable={false}
          panOnScroll
          zoomOnDoubleClick={false}
        >
          <Background
            color={tokens.colorNeutralStroke3}
            gap={24}
            size={1}
          />
          <Controls showInteractive={false} position="bottom-right" />
        </ReactFlow>
      </div>
      <div className={styles.legend} aria-hidden="true">
        <span>
          <i className={styles.applicationLegend} /> Application
        </span>
        <span>
          <i className={styles.resourceLegend} /> Cloud resource
        </span>
      </div>
    </div>
  )
}

const ApplicationNode = ({ data }: NodeProps<ApplicationFlowNode>) => {
  const styles = useApplicationGraphStyles()

  return (
    <Card className={styles.applicationNode} aria-label={`${data.label} application`}>
      <Handle
        className={styles.handle}
        type="source"
        position={Position.Top}
        id="top"
        isConnectable={false}
      />
      <Handle
        className={styles.handle}
        type="source"
        position={Position.Right}
        id="right"
        isConnectable={false}
      />
      <Handle
        className={styles.handle}
        type="source"
        position={Position.Bottom}
        id="bottom"
        isConnectable={false}
      />
      <Handle
        className={styles.handle}
        type="source"
        position={Position.Left}
        id="left"
        isConnectable={false}
      />
      <span className={styles.applicationContent}>
        <span className={styles.applicationIcon} aria-hidden="true">
          <Apps24Regular />
        </span>
        <Text size={200} className={styles.applicationLabel}>
          {data.label}
        </Text>
        <Text size={100} className={styles.applicationCount}>
          {data.resourceCount} resources
        </Text>
      </span>
    </Card>
  )
}

const ResourceNode = ({ data }: NodeProps<ResourceFlowNode>) => {
  const styles = useApplicationGraphStyles()
  const providerStyles: Record<Resource['provider'], string> = {
    AWS: styles.aws,
    GCP: styles.gcp,
    Azure: styles.azure,
  }

  return (
    <Card
      className={styles.resourceNode}
      aria-label={`${data.resource.name}, ${data.resource.provider} ${data.resource.type}`}
    >
      <Handle
        className={styles.handle}
        type="target"
        position={data.handlePosition}
        isConnectable={false}
      />
      <span
        className={mergeClasses(
          styles.resourceIcon,
          providerStyles[data.resource.provider],
        )}
        aria-hidden="true"
      >
        <CloudDatabaseRegular />
      </span>
      <span className={styles.resourceContent}>
        <Text size={200} className={styles.resourceName}>
          {data.resource.name}
        </Text>
        <Text size={100} className={styles.resourceMeta}>
          {data.resource.type}
        </Text>
      </span>
      <Badge
        className={styles.providerBadge}
        appearance="tint"
        size="small"
      >
        {data.resource.provider}
      </Badge>
    </Card>
  )
}

const nodeTypes = {
  application: ApplicationNode,
  resource: ResourceNode,
}

const createGraph = (
  application: Application,
  resources: Resource[],
): { nodes: GraphNode[]; edges: Edge[] } => {
  const center = {
    x: GRAPH_WIDTH / 2 - APPLICATION_NODE_SIZE / 2,
    y: GRAPH_HEIGHT / 2 - APPLICATION_NODE_SIZE / 2,
  }
  const radiusX = resources.length > 6 ? 285 : 255
  const radiusY = resources.length > 6 ? 155 : 135

  const resourceNodes: ResourceFlowNode[] = resources.map((resource, index) => {
    const angle = (index / resources.length) * Math.PI * 2 - Math.PI / 2
    const { targetPosition } = getConnectionHandles(angle)

    return {
      id: resource.id,
      type: 'resource',
      position: {
        x:
          center.x +
          APPLICATION_NODE_SIZE / 2 +
          Math.cos(angle) * radiusX -
          RESOURCE_NODE_WIDTH / 2,
        y:
          center.y +
          APPLICATION_NODE_SIZE / 2 +
          Math.sin(angle) * radiusY -
          RESOURCE_NODE_HEIGHT / 2,
      },
      data: { resource, handlePosition: targetPosition },
    }
  })

  const applicationNode: ApplicationFlowNode = {
    id: application.id,
    type: 'application',
    position: center,
    data: {
      label: application.name,
      resourceCount: resources.length,
    },
    draggable: false,
  }

  const edges: Edge[] = resources.map((resource, index) => {
    const angle = (index / resources.length) * Math.PI * 2 - Math.PI / 2
    const { sourceHandle } = getConnectionHandles(angle)

    return {
      id: `${application.id}-${resource.id}`,
      source: application.id,
      sourceHandle,
      target: resource.id,
      type: 'straight',
      style: {
        stroke: tokens.colorNeutralStroke1,
        strokeWidth: 1.5,
      },
    }
  })

  return {
    nodes: [applicationNode, ...resourceNodes],
    edges,
  }
}

const getConnectionHandles = (angle: number): {
  sourceHandle: 'top' | 'right' | 'bottom' | 'left'
  targetPosition: Position
} => {
  const horizontalDirection = Math.cos(angle)
  const verticalDirection = Math.sin(angle)
  const isHorizontal =
    Math.abs(horizontalDirection) > Math.abs(verticalDirection)

  if (isHorizontal) {
    return horizontalDirection > 0
      ? { sourceHandle: 'right', targetPosition: Position.Left }
      : { sourceHandle: 'left', targetPosition: Position.Right }
  }

  return verticalDirection > 0
    ? { sourceHandle: 'bottom', targetPosition: Position.Top }
    : { sourceHandle: 'top', targetPosition: Position.Bottom }
}
