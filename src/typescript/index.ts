// Nó da Árvore Binária de Busca
class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

// Classe da Árvore Binária de Busca
class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;
  private count: number = 0;

  // Inserir um elemento na árvore
  insert(value: T): void {
    const newNode = new TreeNode(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
    this.count++;
  }

  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>): void {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  // Pesquisar um elemento na árvore
  search(value: T): boolean {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: TreeNode<T> | null, value: T): boolean {
    if (node === null) return false;
    if (value === node.value) return true;
    if (value < node.value) return this.searchNode(node.left, value);
    return this.searchNode(node.right, value);
  }

  // Busca em largura (BFS)
  breadthFirstTraversal(): void {
    if (this.root === null) return;
    const queue: TreeNode<T>[] = [this.root];
    const result: T[] = [];

    while (queue.length > 0) {
      const current = queue.shift()!;
      result.push(current.value);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    console.log("Busca em Largura (BFS):", result.join(" -> "));
  }

  // Pré-Ordem
  preOrderTraversal(): void {
    const result: T[] = [];
    this.preOrder(this.root, result);
    console.log("Pré-Ordem:", result.join(" -> "));
  }

  private preOrder(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      result.push(node.value);
      this.preOrder(node.left, result);
      this.preOrder(node.right, result);
    }
  }

  // Em-Ordem
  inOrderTraversal(): void {
    const result: T[] = [];
    this.inOrder(this.root, result);
    console.log("Em-Ordem:", result.join(" -> "));
  }

  private inOrder(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }
  }

  // Pós-Ordem
  postOrderTraversal(): void {
    const result: T[] = [];
    this.postOrder(this.root, result);
    console.log("Pós-Ordem:", result.join(" -> "));
  }

  private postOrder(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.postOrder(node.left, result);
      this.postOrder(node.right, result);
      result.push(node.value);
    }
  }

  // Altura da árvore
  height(): number {
    return this.calculateHeight(this.root);
  }

  private calculateHeight(node: TreeNode<T> | null): number {
    if (node === null) return -1;
    const leftHeight = this.calculateHeight(node.left);
    const rightHeight = this.calculateHeight(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Quantidade de elementos
  size(): number {
    return this.count;
  }

  // Exibir os nós ancestrais de um determinado elemento
  ancestors(value: T): T[] {
  const path: T[] = [];
  let current = this.root;

  while (current !== null) {
    if (value === current.value) {
      return path;
    } else if (value < current.value) {
      path.push(current.value);
      current = current.left;
    } else {
      path.push(current.value);
      current = current.right;
    }
  }

  return []; // Não encontrado
}


// Exibir os nós descendentes de um determinado elemento
  descendants(value: T): T[] {
  const targetNode = this.findNode(this.root, value);
  const result: T[] = [];

  if (targetNode) {
    this.collectDescendants(targetNode, result);
  }

  return result;
}

private findNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
  if (node === null) return null;
  if (value === node.value) return node;
  if (value < node.value) return this.findNode(node.left, value);
  return this.findNode(node.right, value);
}

private collectDescendants(node: TreeNode<T>, result: T[]): void {
  if (node.left) {
    result.push(node.left.value);
    this.collectDescendants(node.left, result);
  }
  if (node.right) {
    result.push(node.right.value);
    this.collectDescendants(node.right, result);
  }
}

// Exibir o nível de um elemento/nó
  level(value: T): number {
    return this.findLevel(this.root, value, 0);
  }

  private findLevel(node: TreeNode<T> | null, value: T, currentLevel: number): number {
    if (node === null) return -1; // Elemento não encontrado
    if (value === node.value) return currentLevel;

    const leftLevel = this.findLevel(node.left, value, currentLevel + 1);
    if (leftLevel !== -1) return leftLevel;

    return this.findLevel(node.right, value, currentLevel + 1);
  }
  // Verificar se a árvore é estritamente binária
  isStrictlyBinary(): boolean {
  return this.checkStrictlyBinary(this.root);
}

private checkStrictlyBinary(node: TreeNode<T> | null): boolean {
  if (node === null) return true;

  if ((node.left === null && node.right !== null) ||
      (node.left !== null && node.right === null)) {
    return false;
  }

  return this.checkStrictlyBinary(node.left) && this.checkStrictlyBinary(node.right);
}

// Verificar se a árvore é cheia
isFull(): boolean {
  const totalNodes = this.count;
  const height = this.height();

  // Fórmula para uma árvore cheia: total = 2^(h+1) - 1
  return totalNodes === Math.pow(2, height + 1) - 1;
}



  
}

// Testando a Árvore
const bst = new BinarySearchTree<number>();

bst.insert(50);
bst.insert(30);
bst.insert(70);
bst.insert(20);
bst.insert(40);
bst.insert(60);
bst.insert(80);

console.log("Elemento 40 está na árvore?", bst.search(40)); // true
console.log("Elemento 90 está na árvore?", bst.search(90)); // false

bst.breadthFirstTraversal(); // Busca em Largura
bst.preOrderTraversal();     // Pré-Ordem
bst.inOrderTraversal();      // Em-Ordem
bst.postOrderTraversal();    // Pós-Ordem

console.log("Altura da árvore:", bst.height());  // Deve exibir 2
console.log("Quantidade de elementos:", bst.size()); // Deve exibir 7
console.log("Ancestrais do elemento 40:", bst.ancestors(40)); // Deve exibir [50, 30]
console.log("Descendentes do elemento 30:", bst.descendants(30)); // Deve exibir [20, 40]
console.log("Nível do elemento 60:", bst.level(60)); // Deve exibir 2
console.log("A árvore é estritamente binária?", bst.isStrictlyBinary()); // Deve exibir true
console.log("A árvore é cheia?", bst.isFull()); // Deve exibir false
