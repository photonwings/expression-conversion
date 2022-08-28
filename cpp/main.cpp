#include <iostream>
using namespace std;

int main()
{
    int ch;
    cout << "***Convertion of infix expression to prefix and postfix***" << endl;
    do {
        cout << "******************************" << endl;
        cout << "1) Convert using Linked List\n2) Convert using Array\n0) Exit" << endl;
        cin >> ch;
        cout << "******************************" << endl;

        switch (ch) {
        case 1:
            cout << "Conversion using Linked List:" << endl;
            system("./usingLinkedList.out");
            break;
        case 2:
            cout << "Conversion using Array:" << endl;
            system("./usingArray.out");
            break;
        case 0:
            cout << "Exiting..." << endl;
            return 0;
        default:
            cout << "Enter valid option" << endl;
        }
    } while (true);
    return 0;
}