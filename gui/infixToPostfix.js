let postorderAns;
let preorderAns;
class nptr {
  constructor(c) {
    this.left = null;
    this.right = null;
    this.data = c;
  }
}

function newNode(c) {
  let n = new nptr(c);
  return n;
}

function build(s) {
  preorderAns = "";
  postorderAns = "";
  let stN = [];

  let stC = [];
  let t, t1, t2;

  let p = new Array(123);
  p["+".charCodeAt()] = p["-".charCodeAt()] = 1;
  p["/".charCodeAt()] = p["*".charCodeAt()] = 2;
  p["^".charCodeAt()] = 3;
  p[")".charCodeAt()] = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] == "(") {
      stC.push(s[i]);
    } else if (/[a-zA-Z]/.test(s[i])) {
      t = newNode(s[i]);
      stN.push(t);
    } else if (p[s[i].charCodeAt()] > 0) {
      while (
        stC.length != 0 &&
        stC[stC.length - 1] != "(" &&
        ((s[i] != "^" &&
          p[stC[stC.length - 1].charCodeAt()] >= p[s[i].charCodeAt()]) ||
          (s[i] == "^" &&
            p[stC[stC.length - 1].charCodeAt()] > p[s[i].charCodeAt()]))
      ) {
        t = newNode(stC[stC.length - 1]);
        stC.pop();

        t1 = stN[stN.length - 1];
        stN.pop();

        t2 = stN[stN.length - 1];
        stN.pop();

        t.left = t2;
        t.right = t1;

        stN.push(t);
      }

      stC.push(s[i]);
    } else if (s[i] == ")") {
      while (stC.length != 0 && stC[stC.length - 1] != "(") {
        t = newNode(stC[stC.length - 1]);
        stC.pop();
        t1 = stN[stN.length - 1];
        stN.pop();
        t2 = stN[stN.length - 1];
        stN.pop();
        t.left = t2;
        t.right = t1;
        stN.push(t);
      }
      stC.pop();
    }
  }
  t = stN[stN.length - 1];
  return t;
}

function postorder(root) {
  if (root != null) {
    postorder(root.left);
    postorder(root.right);
    postorderAns += root.data;
  }
  return postorderAns;
}

function preorder(root) {
  if (root != null) {
    preorderAns += root.data;

    preorder(root.left);
    preorder(root.right);
  }
  return preorderAns;
}

export { postorder, preorder, build };
