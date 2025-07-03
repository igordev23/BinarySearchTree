// Nó da Árvore Binária de Busca
class TreeNode {
    constructor(value){
        this.left = null;
        this.right = null;
        this.value = value;
    }
}
// Classe da Árvore Binária de Busca
class BinarySearchTree {
    // Inserir um elemento na árvore
    insert(value) {
        const newNode = new TreeNode(value);
        if (this.root === null) this.root = newNode;
        else this.insertNode(this.root, newNode);
        this.count++;
    }
    insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) node.left = newNode;
            else this.insertNode(node.left, newNode);
        } else if (node.right === null) node.right = newNode;
        else this.insertNode(node.right, newNode);
    }
    // Pesquisar um elemento na árvore
    search(value) {
        return this.searchNode(this.root, value);
    }
    searchNode(node, value) {
        if (node === null) return false;
        if (value === node.value) return true;
        if (value < node.value) return this.searchNode(node.left, value);
        return this.searchNode(node.right, value);
    }
    // Busca em largura (BFS)
    breadthFirstTraversal() {
        if (this.root === null) return;
        const queue = [
            this.root
        ];
        const result = [];
        while(queue.length > 0){
            const current = queue.shift();
            result.push(current.value);
            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
        console.log("Busca em Largura (BFS):", result.join(" -> "));
    }
    // Pré-Ordem
    preOrderTraversal() {
        const result = [];
        this.preOrder(this.root, result);
        console.log("Pr\xe9-Ordem:", result.join(" -> "));
    }
    preOrder(node, result) {
        if (node !== null) {
            result.push(node.value);
            this.preOrder(node.left, result);
            this.preOrder(node.right, result);
        }
    }
    // Em-Ordem
    inOrderTraversal() {
        const result = [];
        this.inOrder(this.root, result);
        console.log("Em-Ordem:", result.join(" -> "));
    }
    inOrder(node, result) {
        if (node !== null) {
            this.inOrder(node.left, result);
            result.push(node.value);
            this.inOrder(node.right, result);
        }
    }
    // Pós-Ordem
    postOrderTraversal() {
        const result = [];
        this.postOrder(this.root, result);
        console.log("P\xf3s-Ordem:", result.join(" -> "));
    }
    postOrder(node, result) {
        if (node !== null) {
            this.postOrder(node.left, result);
            this.postOrder(node.right, result);
            result.push(node.value);
        }
    }
    // Altura da árvore
    height() {
        return this.calculateHeight(this.root);
    }
    calculateHeight(node) {
        if (node === null) return -1;
        const leftHeight = this.calculateHeight(node.left);
        const rightHeight = this.calculateHeight(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }
    // Quantidade de elementos
    size() {
        return this.count;
    }
    constructor(){
        this.root = null;
        this.count = 0;
    }
}
// Testando a Árvore
const bst = new BinarySearchTree();
bst.insert(50);
bst.insert(30);
bst.insert(70);
bst.insert(20);
bst.insert(40);
bst.insert(60);
bst.insert(80);
console.log("Elemento 40 est\xe1 na \xe1rvore?", bst.search(40)); // true
console.log("Elemento 90 est\xe1 na \xe1rvore?", bst.search(90)); // false
bst.breadthFirstTraversal(); // Busca em Largura
bst.preOrderTraversal(); // Pré-Ordem
bst.inOrderTraversal(); // Em-Ordem
bst.postOrderTraversal(); // Pós-Ordem
console.log("Altura da \xe1rvore:", bst.height()); // Deve exibir 2
console.log("Quantidade de elementos:", bst.size()); // Deve exibir 7

//# sourceMappingURL=index.a2469503.js.map
