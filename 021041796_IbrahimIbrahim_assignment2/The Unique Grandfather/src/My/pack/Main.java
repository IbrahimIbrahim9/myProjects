package My.pack;

public class Main {
    public static void main(String[] args) {
        LCRSTree T = new LCRSTree("Grandfather" , null,'M');
        T.insert("Grandfather" , "Adel" , 'M');
        T.insert("Grandfather" , "Ibrahim" , 'M');
        T.insert("Grandfather" , "Rema" , 'F');
        T.insert("Ibrahim" , "Maria" , 'F');
        T.insert("Maria" , "Ahmad" , 'M');
        T.insert("Ibrahim" , "Yara" , 'F');
        T.insert("Yara" , "Ashraf" , 'M');
        System.out.println(T.getTheLevelOfTheNextMutation());
    }
}