"use client"

/**
 * ASSIGNMENT NODE GRAPH COMPONENT
 * -------------------------------
 * This component visualizes the student's learning path as a directed graph.
 * It uses the @xyflow/react library (formerly React Flow) to render nodes and edges.
 * 
 * ARCHITECTURE:
 * - Nodes: Represent individual assignments or experiments.
 * - Edges: Represent prerequisites or the logical flow of the course.
 * - State: Uses useNodesState and useEdgesState for interactive canvas features (dragging, etc).
 */

import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  ContextMenuItem,
  Node,
  Edge,
  MarkerType,
  Position,
  Background,
  Controls,
  MiniMap
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import AssignmentNode from './AssignmentNode';

/**
 * Node Type Definitions
 * Maps custom React components to ReactFlow node types.
 */
const nodeTypes = {
  assignment: AssignmentNode, // Custom component defined in './AssignmentNode.tsx'
};

/**
 * INITIAL NODES DATA (MOCK)
 * Simulates a linear path through a semester.
 * 
 * @todo TO REPLACE WITH SUPABASE:
 * 1. Fetch nodes from 'curriculum_nodes' table:
 *    `supabase.from('curriculum_nodes').select('*').eq('subject_id', subjectId)`
 * 2. Map 'x' and 'y' coordinates from the DB to the 'position' object.
 * 3. Map status (completed/active/locked) by checking user progress in 'submissions' table.
 */
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'assignment',
    data: { 
        title: 'Experiment 1: String Theory', 
        subTitle: 'Unit 1',
        deadline: '12 Jan 2024',
        submittedDate: '10 Jan 2024',
        status: 'completed'
    },
    position: { x: 50, y: 100 },
    draggable: true,
  },
  {
    id: '2',
    type: 'assignment',
    data: { 
        title: 'Experiment 2: Quantum Mechanics', 
        subTitle: 'Unit 1 - Evaluation',
        deadline: '20 Jan 2024',
        submittedDate: '19 Jan 2024',
        status: 'completed'
    },
    position: { x: 600, y: 100 },
    draggable: true,
  },
  {
    id: '3',
    type: 'assignment',
    data: { 
        title: 'Project Step 1: Research',
        subTitle: 'Mid-Term',
        deadline: '15 Feb 2024',
        submittedDate: null, 
        status: 'active'
    },
    position: { x: 1150, y: 100 },
    draggable: true,
  },
  {
    id: '4',
    type: 'assignment',
    data: { 
        title: 'Unit 3: Thermo-dynamics',
        subTitle: 'Unit 3',
        deadline: null, 
        submittedDate: null,
        status: 'locked'
    },
    position: { x: 1700, y: 100 },
    draggable: true,
    selectable: false, 
  },
  {
    id: '5',
    type: 'assignment',
    data: { 
        title: 'Final Exam Preparation',
        subTitle: 'End Sem',
        deadline: null, 
        submittedDate: null,
        status: 'locked'
    },
    position: { x: 2250, y: 100 },
    draggable: true,
    selectable: false,
  },
];

/**
 * INITIAL EDGES DATA (MOCK)
 * Defines the connections between nodes.
 * 
 * @todo TO REPLACE WITH SUPABASE:
 * 1. Fetch from 'curriculum_edges' table:
 *    `supabase.from('curriculum_edges').select('*').eq('subject_id', subjectId)`
 * 2. Animated property should be true if the source node is completed.
 */
const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#f97316', strokeWidth: 2 } }, 
  { id: 'e3-4', source: '3', target: '4', markerEnd: { type: MarkerType.ArrowClosed, color: '#9ca3af' }, style: { stroke: '#9ca3af', strokeWidth: 2 } },
  { id: 'e4-5', source: '4', target: '5', markerEnd: { type: MarkerType.ArrowClosed, color: '#9ca3af' }, style: { stroke: '#9ca3af', strokeWidth: 2 } },
];

/**
 * THE GRAPH COMPONENT
 * @param subjectId The ID of the subject being viewed (e.g., 'dsa', 'physics')
 */
export function AssignmentNodeGraph({ subjectId }: { subjectId: string }) {
  // Local state for ReactFlow
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Memoize nodeTypes so it doesn't re-render unnecessarily on every state change
  const customNodeTypes = useMemo(() => nodeTypes, []);

  return (
    <div style={{ height: '100%', width: '100%', background: '#fafafa' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={customNodeTypes}
        defaultViewport={{ x: 50, y: 50, zoom: 0.8 }} 
        minZoom={0.2}
        maxZoom={4} 
        defaultEdgeOptions={{ type: 'smoothstep' }} 
      >
        {/* Adds a background grid for better visibility */}
        <Background gap={12} size={1} />
        
        {/* Adds zoom/pan controls to the bottom left */}
        <Controls />
        
        {/* Navigation Minimap in the bottom right */}
        <MiniMap 
          nodeStrokeColor={(n) => {
              if (n.data.status === 'completed') return '#10b981';
              if (n.data.status === 'active') return '#f97316';
              return '#cbd5e1';
          }} 
          nodeColor={(n) => {
              if (n.data.status === 'completed') return '#d1fae5';
              if (n.data.status === 'active') return '#ffedd5';
              return '#f1f5f9';
          }}
        />
      </ReactFlow>
    </div>
  );
}
