#include <iostream>
#include <string>

using namespace std;

// Class for Tree
class Tree {
public:
    char data;
    Tree* left;
    Tree* right;

    // Static method to create new Tree node
    static Tree* newTreeNode(char data);
};
Tree* Tree::newTreeNode(char data)
{
    // Creating new instance of Tree
    Tree* temp = new Tree();
    // Assigning value to data
    temp->data = data;
    // Making both left and right pointers NULL
    temp->left = temp->right = NULL;
    // Returning the new Tree node
    return temp;
}

// Class for character stack
class CharStack {
private:
    // Top of the CharStack
    int top;
    // Character Array
    char stack[100];

public:
    // Constructor
    CharStack();
    // Push new element to CharStack
    void push(char ele);
    // Pop top element of CharStack
    char pop();
    // Returns top element of the stack
    char peak();
    // Returns true if stack is empty, else false
    bool empty();
};

CharStack::CharStack()
{
    // Initializing top to -1 at the begining
    top = -1;
}

void CharStack::push(char ele)
{
    // Increment top and add element to stack
    stack[++top] = ele;
}

char CharStack::pop()
{
    // Store top element in temp and delete element from stack
    char temp = stack[top--];

    return temp;
}

char CharStack::peak()
{
    return stack[top];
}

bool CharStack::empty()
{
    return top == -1;
}

// Class for tree stack
class TreeStack {
private:
    // Top of the TreeStack
    int top;
    // TreeNode Array
    Tree* stack[100];

public:
    // Constructor
    TreeStack();
    // Push new element to TreeStack
    void push(Tree* ele);
    // Pop top element of TreeStack
    Tree* pop();
    // Returns top element of TreeStack
    Tree* peak();
};

TreeStack::TreeStack()
{
    // Initializing top to -1 at the begining
    top = -1;
}

void TreeStack::push(Tree* ele)
{
    // Increment top and add element to stack
    stack[++top] = ele;
}

Tree* TreeStack::pop()
{
    // Store top element in temp and delete element from stack
    Tree* temp = stack[top--];

    return temp;
}

Tree* TreeStack::peak()
{
    return stack[top];
}

// Constructing expression tree
Tree* build(string& s)
{
    // To store paranthesis and operators
    CharStack charStack;
    // To store Expression tree node and characters in given expression
    TreeStack treeStack;
    // Temporary pointers to construct expression tree
    Tree *t, *t1, *t2;

    // Setting order of precedence
    // All ASCII characters below 123 are assigned with 0 precedence
    int p[123] = { 0 };
    // Changing precedence of ( to 0
    p[')'] = 0;
    // Changing precedence of + and - to 1
    p['+'] = p['-'] = 1;
    // Changing precedence of / and * to 2
    p['/'] = p['*'] = 2;
    // Changing precedence of ^ to 3
    p['^'] = 3;

    // Looping over every character of given expression
    for (int i = 0; i < s.length(); i++) {
        // Checking if the current character is opening bracket
        if (s[i] == '(') {
            // Pushing opeining bracket to charStack
            charStack.push(s[i]);
        }
        // Checking if the current character is Alphabet
        else if (isalpha(s[i])) {
            // Creating new TreeNode with the character
            t = Tree::newTreeNode(s[i]);
            // Pushing it to treeStack
            treeStack.push(t);
        }
        // Checking if precedence of current character is greater than 0
        else if (p[s[i]] > 0) {
            /*
             * charStack should not be empty and its top element should not be (
             *      and
             * Current character should not be ^ and its precedence should be
             * less than or equl to precedence of character at top of charStack
             *  or
             * Current character should be ^ and its precedence should be less
             * than precedence of character at top of charStack
             */
            while (
                (!charStack.empty() && charStack.peak() != '(')
                && ((s[i] != '^' && p[charStack.peak()] >= p[s[i]])
                    || (s[i] == '^'
                        && p[charStack.peak()] > p[s[i]]))) {

                // Creating new TreeNode with top element of charStack
                t = Tree::newTreeNode(charStack.peak());
                // Poping top element of charStack
                charStack.pop();

                // Assigning top element of treeStack to t1
                t1 = treeStack.peak();
                // Poping top element of treeStack
                treeStack.pop();

                // Assigning top element of treeStack to t2
                t2 = treeStack.peak();
                // Poping top element of treeStack
                treeStack.pop();

                // Making left pointer of new TreeNode as t2
                t->left = t2;
                // Making left pointer of new TreeNode as t1
                t->right = t1;

                // Pushing new tree to the treeStack
                treeStack.push(t);
            }
            // If while condition fails directly push the current character to
            // charStack
            charStack.push(s[i]);
        }
        // Checking if the current character is )
        else if (s[i] == ')') {
            // charStack should not be empty
            // and top element of charStack should not be (
            while (!charStack.empty() && charStack.peak() != '(') {
                // Creating new TreeNode with top element of charStack
                t = Tree::newTreeNode(charStack.peak());
                // Poping top element of charStack
                charStack.pop();

                // Assigning top element of treeStack to t1
                t1 = treeStack.peak();
                // Poping top element of treeStack
                treeStack.pop();

                // Assigning top element of treeStack to t2
                t2 = treeStack.peak();
                // Poping top element of treeStack
                treeStack.pop();

                // Making left pointer of new TreeNode as t2
                t->left = t2;
                // Making left pointer of new TreeNode as t1
                t->right = t1;

                // Pushing new tree to the treeStack
                treeStack.push(t);
            }
            // If the current character is (, pop it
            charStack.pop();
        }
    }
    // Returning address of root node of tree
    return treeStack.peak();
}

void inorder(Tree* root)
{
    if (root) {
        inorder(root->left);
        cout << root->data;
        inorder(root->right);
    }
}

void preorder(Tree* root)
{
    if (root) {
        cout << root->data;
        preorder(root->left);
        preorder(root->right);
    }
}

void postorder(Tree* root)
{
    if (root) {
        postorder(root->left);
        postorder(root->right);
        cout << root->data;
    }
}

int main()
{
    string s;
    cout << "Enter Infix expression: ";
    cin >> s;
    cout << endl;

    // Opening and closing brackets are added to connect Nodes at the end
    s = "(" + s;
    s += ")";

    Tree* root = build(s);

    cout << "Infix expression: ";
    inorder(root);
    cout << endl;

    cout << "Prefix expression: ";
    preorder(root);
    cout << endl;

    cout << "Postfix expression: ";
    postorder(root);
    cout << endl;

    return 0;
}