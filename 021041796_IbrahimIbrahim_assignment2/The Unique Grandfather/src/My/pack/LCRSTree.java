package My.pack;

class LCRSTree {
    Node root;
    public static  String s="";
    public static  int MAX=0;
    public static int numOfEdges=0;

    public LCRSTree(String name ,String parentName ,  char gender) {
        this.root = new Node(name ,parentName, gender);
    }

    public void insert(String parentName, String name , char gender) {
        Node parent = search(parentName);
        if (parent == null) {
            System.out.println("Parent node not found");
            return;
        }
        // if the father doesn't have any childes yet
        if (parent.firstChild == null) {
            parent.firstChild = new Node(name ,parentName, gender);
        } else {
            Node sibling = parent.firstChild;
        // reaching the last sibling added and insert a brother or a sister
            while (sibling.nextSibling != null) {
                sibling = sibling.nextSibling;
            }
            sibling.nextSibling = new Node(name ,parentName, gender);
        }
    }
// reaching the father of the node I want to delete and search for it and delete it
    public void delete(String name) {
        if (root == null) {
            System.out.println("Tree is empty");
            return;
        }
        if (root.getName() == name) {
            root = null;
            return;
        }
        // these two statements to bring the father of a node according to it's name
        Node theName = search(name);
        Node parent = search(theName.getParent());

        if (parent == null) {
            System.out.println("Node not found");
            return;
        }
        Node nodeToDelete = parent.firstChild;
        // if the node to delete is in the first child position
        if (nodeToDelete.getName() == name) {
            parent.firstChild = nodeToDelete.nextSibling;
            return;
        }
        while (nodeToDelete.nextSibling != null) {
            if (nodeToDelete.nextSibling.getName() == name) {
                nodeToDelete.nextSibling = nodeToDelete.nextSibling.nextSibling;
                return;
            }
            nodeToDelete = nodeToDelete.nextSibling;
        }
        System.out.println("Node not found");
    }

    public Node search(String Name) {
        if (root == null) {
            System.out.println("Tree is empty");
            return null;
        }
        return searchHelper(root, Name);
    }

    public Node searchHelper(Node node, String Name) {
        if (node == null) {
            return null;
        }
        if (node.getName() == Name) {
            return node;
        }
        Node child = searchHelper(node.firstChild, Name);
        if (child != null) {
            return child;
        }
        return searchHelper(node.nextSibling, Name);
    }

    public int getHeight(Node root) {
        if (root == null) {
            return 0;
        }
        int maxChildHeight = -1;
        Node child = root.getFirstChild();
        while (child != null) {
            int childHeight = getHeight(child);
            if (childHeight > maxChildHeight) {
                maxChildHeight = childHeight;
            }
            child = child.getNextSibling();
        }
        return maxChildHeight + 1;
    }
    public void directChildrenOfTheUniqueGrandFather(){
        if(root==null){
            System.out.println("there are no childrens");
            return ;
        }
        Node firstChild = root.getFirstChild();
        System.out.print(firstChild.toString() + " " );
        Node sibling = firstChild.getNextSibling();
        while(sibling!=null) {
            System.out.println(sibling.toString());
            sibling = sibling.getNextSibling();

        }
    }
    public int getTheLevelOfTheTreeStartingFromZero() {
        return getHeight(root);
    }
    public Node getBrotherOrSister(String fatherName , String name ,String nameOfTheBroOrTheSis, char gender){
        Node son = search(name);
        Node father = search(son.getParent());
        if(fatherName==father.getName()){
            Node sibling = father.getFirstChild();
            while(sibling!=null){
                if(sibling.getName()==nameOfTheBroOrTheSis && sibling.getGender()==gender)
                    return sibling;
                sibling = sibling.getNextSibling();
            }

        }
        return null;
    }
    public Node getAuntOrUncleOfSomeone(String Father ,String name , String nameOfTheAuntOrTheUncle , char gender ) {
        Node son = search(name);
        Node father = search(son.getParent());
        Node parentOfTheFather = search(father.getParent());
        Node AuntOrUncle = parentOfTheFather.getFirstChild();
        while(AuntOrUncle!=null) {
            if(AuntOrUncle.getName()==nameOfTheAuntOrTheUncle&&AuntOrUncle.getGender()==gender){
                return AuntOrUncle;
            }
            AuntOrUncle = AuntOrUncle.getNextSibling();
        }
        return null ;
    }
    public int getDegreeOfANodeByName(String name){
        Node theNode = search(name);
        Node childes = theNode.getFirstChild();
        int count = 0;
        while(childes!=null) {
            count++;
            childes = childes.getNextSibling();

        }
        return count;

    }
    public int getDegreeOfANode(Node root) {
        Node childes = root.getFirstChild();
        int count = 0;
        while(childes!=null) {
            count++;
            childes = childes.getNextSibling();

        }
        return count;
    }
    public int getDegreeOfTheTree(Node root) {
        if(root == null)
            return 0;
        getDegreeOfTheTree(root.getFirstChild());
        getDegreeOfTheTree(root.getNextSibling());
        MAX = Math.max(MAX,getDegreeOfANode(root));
        return MAX;

    }

    public Node getAuntOrUncleSonOfSomeone(String Father ,String name , String nameOfTheAuntOrTheUncle , char gender , String nameOfTheSon , char genderOfTheSon ) {
        Node TheAuntOrTheUncleChosen = getAuntOrUncleOfSomeone(Father , name , nameOfTheAuntOrTheUncle , gender );
        Node TheAuntOrTheUncleChosenChild = TheAuntOrTheUncleChosen.getFirstChild();
        while(TheAuntOrTheUncleChosenChild!=null){
            if(TheAuntOrTheUncleChosenChild.getName()==nameOfTheSon&&TheAuntOrTheUncleChosenChild.getGender() == genderOfTheSon) {
                return TheAuntOrTheUncleChosenChild;
            }
            TheAuntOrTheUncleChosenChild = TheAuntOrTheUncleChosenChild.getNextSibling();
        }
        return null;
    }
    public void allTheWayToAshraf(Node root , String name) {

        Node getFather = search(name);
        Node parent = search(getFather.getParent());
       if(parent==null){
        s+="Ashraf's path : ";
        return ;
       }
       allTheWayToAshraf(root , parent.getName());
        s = s + parent.getName() + "    ";
        numOfEdges++;

    }
    public int depthOfAshraf() {
        if(numOfEdges==0)
            allTheWayToAshraf(root , "Ashraf");
        return numOfEdges ;
    }
    public int getTheLevelOfAshraf() {
    if(numOfEdges==0)
        allTheWayToAshraf(root ,"Ashraf" );
    return numOfEdges;
    }
    public int getTheLevelOfTheNextMutation() {
       int result =  getTheLevelOfAshraf() + (3*4)+3;
       return result;
    }
    void printTree(Node node, int level) {
        if (node == null) {
            return;
        }

        // Print the current node
        for (int i = 0; i < level; i++) {
            System.out.print("  ");
        }
        System.out.println(node.getName());

        // Recursively print the left child and its siblings
        if (node.getFirstChild() != null) {
            printTree(node.getFirstChild(), level + 1);
            Node sibling = node.getFirstChild().getNextSibling();
            while (sibling != null) {
                printTree(sibling, level + 1);
                sibling = sibling.getNextSibling();
            }
        }
    }
}

