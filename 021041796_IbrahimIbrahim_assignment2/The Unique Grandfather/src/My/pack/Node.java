package My.pack;

public class Node {
    private String name ;
    private String Parent = null;
    private char gender ;
    Node firstChild;
    Node nextSibling;

    public Node(String name , String ParentName , char gender ) {
        this.name = name;
        this.gender = gender;
        this.Parent = ParentName;
        this.firstChild = null;
        this.nextSibling = null;
    }

    public String getParent() {
        return Parent;
    }

    public void setParent(String parent) {
        Parent = parent;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public Node getFirstChild() {
        return firstChild;
    }

    public void setFirstChild(Node firstChild) {
        this.firstChild = firstChild;
    }

    public Node getNextSibling() {
        return nextSibling;
    }

    public void setNextSibling(Node nextSibling) {
        this.nextSibling = nextSibling;
    }

    @Override
    public String toString() {
        return "Node{" +
                "name='" + name + '\'' +
                ", Parent='" + Parent + '\'' +
                ", gender=" + gender +
                '}';
    }
}
