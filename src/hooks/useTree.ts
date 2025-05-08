import { useState, useCallback } from 'react';

export type Node = {
    id: string; //? id on ancestor should be something like '0','1',... and id on first level nodes should be something like '00','01','10','11',... and id on last level nodes should be something like '000','001','010','011',... and so on
    nodes?: Node[]; //? will act and nested nodes of each tree leaf
    [key: string]: any;
};
type UseTreeArgs<T> = {
    tree: T[];
};

const useTree = <T extends Node>({ tree = [] }: UseTreeArgs<T>) => {
    //! 'tree' is initial input tree and methods like filter,... should not mutate it and should work with clone of it
    const [localTree, setLocalTree] = useState(tree);
    //* for execute a callback on every single node
    const traverseNodes = useCallback(
        ({ nodes = localTree, cb }: { nodes?: Node[]; cb: (node: Node) => void }): void => {
            //sync version  for sync callback
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                cb(node);
                node.nodes?.length && traverseNodes({ nodes: node.nodes, cb });
            }
        },
        [localTree]
    );
    const traverseNodesAsync = useCallback(
        async ({ nodes = localTree, cb }: { nodes?: Node[]; cb: (node: Node) => Promise<unknown> }): Promise<void> => {
            //async version for async callback
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                await cb(node);
                node.nodes?.length && (await traverseNodesAsync({ nodes: node.nodes, cb }));
            }
        },
        [localTree]
    );
    //* for find specific node at any depth
    const findNode = useCallback(
        ({ nodes = localTree, cb }: { nodes?: Node[]; cb: (node: Node) => boolean }): Promise<null | Node> => {
            return new Promise(async (resolve) => {
                for (let i = 0; i < nodes.length; i++) {
                    const leaf = nodes[i];
                    if (cb(leaf)) return resolve(leaf);
                    const nestedNode = leaf.nodes?.length && (await findNode({ nodes: leaf.nodes, cb }));
                    if (nestedNode) return resolve(nestedNode);
                }
                return resolve(null);
            });
        },
        [localTree]
    );
    //* for find direct parent node of specific node at any depth
    const findParent = useCallback(
        async ({ nodes = localTree, cb }: { nodes?: Node[]; cb: (node: Node) => boolean }): Promise<null | Node> => {
            const node = await findNode({ nodes, cb });
            if (node) {
                const parentId = `${node.id}`.slice(0, -1);
                const parent = await findNode({ nodes, cb: (node) => node.id === parentId });
                return parent;
            }
            return null;
        },
        [localTree, findNode]
    );
    //* for find all parents(ancestors) nodes of specific node at any depth
    const findAncestors = useCallback(
        async ({ nodes = localTree, cb }: { nodes?: Node[]; cb: (node: Node) => boolean }): Promise<Node[]> => {
            const node = await findNode({ nodes, cb });
            if (node) {
                const nodeId = node.id;
                const totalAncestorsCount = nodeId.length - 1;
                const ancestors: Node[] = [];
                for (let i = 0; i < totalAncestorsCount; i++) {
                    const ancestorId = nodeId.slice(0, i + 1);
                    const ancestor = await findNode({ nodes, cb: (node) => node.id === ancestorId });
                    ancestor && ancestors.push(ancestor);
                }
                return ancestors;
            }
            return [];
        },
        [localTree, findNode]
    );
    //* for find most top parent(top-ancestor) node of specific node at any depth
    const findTopAncestor = useCallback(
        async ({ nodes = localTree, cb }: { nodes?: Node[]; cb: (node: Node) => boolean }): Promise<null | Node> => {
            const ancestors = await findAncestors({ nodes, cb });
            return ancestors[0] || null;
        },
        [localTree, findAncestors]
    );
    //* for find all direct child nodes of specific node at any depth
    const findChildren = useCallback(
        async ({ nodes = localTree, cb }: { nodes?: Node[]; cb: (node: Node) => boolean }): Promise<Node[]> => {
            const node = await findNode({ nodes, cb });
            return node?.nodes || [];
        },
        [localTree, findNode]
    );
    //* for find all children nodes of specific node at any depth
    const findDescendants = useCallback(
        async ({ nodes = localTree, cb }: { nodes?: Node[]; cb: (node: Node) => boolean }): Promise<Node[]> => {
            const node = await findNode({ nodes, cb });
            if (node?.nodes?.length) {
                const descendants: Node[] = [];
                traverseNodes({
                    nodes: node.nodes,
                    cb: (node) => node.id.startsWith(node.id) && descendants.push(node)
                });
                return descendants;
            }
            return [];
        },
        [localTree, findNode, traverseNodes]
    );
    //* for find all children nodes of specific node at last depth
    const findBottomDescendants = useCallback(
        async ({ nodes = localTree, cb }: { nodes?: Node[]; cb: (node: Node) => boolean }): Promise<Node[]> => {
            const node = await findNode({ nodes, cb });
            if (node?.nodes?.length) {
                const descendants: Node[] = [];
                traverseNodes({
                    nodes: node.nodes,
                    cb: (node) => node.id.startsWith(node.id) && !node.nodes?.length && descendants.push(node)
                });
                return descendants;
            }
            return [];
        },
        [localTree, findNode, traverseNodes]
    );
    //* for find all siblings nodes of specific node at any depth
    const findSiblings = useCallback(
        async ({
            nodes = localTree,
            cb,
            filterSelf = true
        }: {
            nodes?: Node[];
            cb: (node: Node) => boolean;
            filterSelf?: boolean;
        }): Promise<Node[]> => {
            const node = await findNode({ nodes, cb });
            const parent = await findParent({ nodes, cb });
            const siblings: Node[] = [];
            parent && parent.nodes?.forEach((node) => siblings.push(node));
            return siblings.filter((sibling) => (filterSelf ? node?.id !== sibling.id : true));
        },
        [localTree, findNode, findParent]
    );
    //* for filter whole tree with keep tree structure
    const filterNodes = useCallback(
        ({ nodes = localTree, cb }: { nodes?: Node[]; cb: (node: Node) => boolean }): Promise<Node[]> => {
            //filter method on tree should keep main structure of the tree means if we want nested node we should keep all its ancestors
            //this method will not mutate original array so basically so need to pass cloned version of tree to it
            return new Promise((resolve) => {
                const getNodes = (result: Node[], node: Node) => {
                    if (cb(node)) {
                        result.push(node);
                        return result;
                    }
                    if (node.nodes?.length) {
                        const nestedNodes = node.nodes.reduce(getNodes, []);
                        nestedNodes.length && result.push({ ...node, nodes: nestedNodes });
                    }
                    return result;
                };
                return resolve(nodes.reduce(getNodes, []));
            });
        },
        [localTree]
    );

    return {
        tree: localTree,
        setTree: setLocalTree,
        traverseNodes,
        traverseNodesAsync,
        findNode,
        findParent,
        findAncestors,
        findTopAncestor,
        findChildren,
        findDescendants,
        findBottomDescendants,
        findSiblings,
        filterNodes
    };
};

export default useTree;

//* Example:
//! methods like .filter , ... should not mutate original state of tree and we should use structuredClone before using them to clone tree
//? id on ancestor should be something like '0','1',... and id on first level nodes should be something like '00','01','10','11',... and id on last level nodes should be something like '000','001','010','011',... and so on
//? each node should always have 'id' key and also it can have optional 'nodes' key to represent children
// import useTree , { type Node } from '@/hooks/useTree';
// type Person = Node & {name: string;nodes?: Person[];};
// const persons: Person[] = [
//     {
//         id: '0',
//         name: 'name0',
//         nodes: [{id: '01',name: 'name01'}]
//     },
//     {
//         id: '1',
//         name: 'name1',
//         nodes: [
//             {id: '10',name: 'name10',nodes: [{id: '100',name: 'name100'}]},
//             {id: '11',name: 'name11'}
//         ]
//     }
// ];
// const {
//     traverseNodes,findNode,
//     findParent,findAncestors,findTopAncestor,
//     findChildren,findDescendants,
//     findSiblings,filterNodes
// } = useTree({ tree: persons });
// const func = async () => {
//     const personsClone = structuredClone(persons);
//     traverseNodes({
//         nodes: personsClone
//         cb: (node) => {
//             node.selected = false
//         }
//     });
//     const node = await findNode({ cb: (node) => node.id === '10' });
//     const parent = await findParent({ cb: (node) => node.id === '10' });
//     const ancestors = await findAncestors({ cb: (node) => node.id === '10' });
//     const topAncestor = await findTopAncestor({ cb: (node) => node.id === '10' });
//     const children = await findChildren({ cb: (node) => node.id === '1' });
//     const descendants = await findDescendants({ cb: (node) => node.id === '1' });
//     const siblings = await findSiblings({ cb: (node) => node.id === '11', filterSelf: true });
//     const filtered = await filterNodes({ cb: (node) => (node as Person).name.includes('name11') });
// };
//? Sometimes we need tree functionality but not we don't have final tree yet:
// const { traverseNodes } = useTree({ tree: [] }); //at first set empty tree
// traverseNodes({
//     nodes: [...], //manually set tree here
//     cb: (node) => {}
// });
