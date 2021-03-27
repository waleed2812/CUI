package sample;
import javafx.fxml.FXML;
import javafx.scene.control.*;

import java.io.File;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.util.Scanner;

public class Controller {

    private Block cache[];
    private byte RAM[];
    private String dashes = "---------------------------------------------------------------------------------------------------------------",
    blockDataBefore="",blockDataAfter="";
    private int ramSize=0,cacheSize=0,blockSize=0,noOfBlocks=0,addressLength=0,blockBitLength=0,offsetBitLength=0,tagBitLength=0;
    @FXML
    public TextField ramSizeIn,blockSizeIn,cacheSizeIn,startAddIn,endAddIn,loopCountIn,addArrayIn;
    @FXML
    public RadioButton ramB,ramKB,ramMB,cacheB,cacheKB,cacheMB,blockB,blockKB,blockMB,rdbtnRandom,rdbtnLoop;
    @FXML
    public Label addressSizeLabel,tagSizeLabel,blockSizeLabel,offsetSizeLabel,missLabel,hitLabel,totalLabel,hitRateLabel;
    @FXML
    public TextArea detailedOut;
    @FXML
    public void fullScreen(){
        if (Main.primaryStage.isFullScreen()){
            Main.primaryStage.setFullScreen(false);
        } else {
            Main.primaryStage.setFullScreen(true);
        }
    }
    private void showAlert(String s){
        Alert errorAlert = new Alert(Alert.AlertType.ERROR);
        errorAlert.setHeaderText("Input not valid");
        errorAlert.setContentText(s);
        errorAlert.showAndWait();
    }
    @FXML
    public void calculate(){
        init();
        /*
        Ram Size Input
         */
        try {
            ramSize=(int)Double.parseDouble(ramSizeIn.getText());
            if(ramKB.isSelected()){
                ramSize *= Math.pow(2,10);
            } else if (ramMB.isSelected()){
                ramSize *= Math.pow(2,20);
            } else {
            }
        } catch (Exception e){
            showAlert("Enter Valid Ram Size.(Integer only)");
            return;
        }
        /*
        Cache Size Input
         */
        try {
            cacheSize=(int)Double.parseDouble(cacheSizeIn.getText());
            if(cacheKB.isSelected()){
                cacheSize *= Math.pow(2,10);
            } else if (cacheMB.isSelected()){
                cacheSize *= Math.pow(2,20);
            } else {
            }
        } catch (Exception e){
            showAlert("Enter Valid Cache Size.(Integer only)");
            return;
        }
        /*
        Block Size Input
         */
        try {
            blockSize=(int)Double.parseDouble(blockSizeIn.getText());
            if(blockKB.isSelected()){
                blockSize *= Math.pow(2,10);
            } else if (blockMB.isSelected()){
                blockSize *= Math.pow(2,20);
            } else {
            }
        } catch (Exception e){
            showAlert("Enter Valid Block Size.(Integer only)");
            return;
        }
        if (cacheSize > ramSize || blockSize > cacheSize){
            showAlert("Enter Sizes in decreasing order Ram Size > Cache Size > Block Size");
            return;
        }
        /*
        Deciding all the allocated bits
         */
        noOfBlocks = Math.round(cacheSize/blockSize);
        addressLength = (int)Math.ceil(logCustomBase(2,ramSize));
        blockBitLength = (int)Math.ceil(logCustomBase( 2,noOfBlocks) );
        offsetBitLength = (int)Math.ceil(logCustomBase(2,blockSize));
        tagBitLength = addressLength - (blockBitLength + offsetBitLength);
        /*
        Showing Allocated Bits
         */
        addressSizeLabel.setText((int)Math.ceil(logCustomBase(2,ramSize)) + " bits");
        tagSizeLabel.setText(tagBitLength + " bits");
        blockSizeLabel.setText(blockBitLength+ " bits");
        offsetSizeLabel.setText(offsetBitLength+ " bits");
        // Counting hit and miss
        int cacheHit=0,cacheMiss=0;
        /*
        Re initializing cache and ram
         */
        try {

            this.RAM = new byte[ramSize];
            this.cache = new Block[noOfBlocks];
            for (int i = 0; i < RAM.length; i++)//Initializing RAM
                RAM[i] = (byte) i;
            byte[] temp = {0, 0, 0, 0, 0, 0, 0, 0};
            for (int i = 0; i < cache.length; i++)//Initializing Cache Blocks
                cache[i] = new Block(false, -1, temp);
        } catch (Exception e) {
            showAlert("Cache or Ram Size too large");
        }
        /*
        Saving Output to a file
         */
        try{
            PrintWriter pw = new PrintWriter(new File("Output.txt"));
            pw.println(dashes);
            pw.printf("%10s|%30s|%10s|%20s|%15s|%20s|%n","Address","Binary","Block Num","Block Data",
                    "Hit or Miss","Block Data After");
            pw.println(dashes);
            pw.close();
        } catch (Exception e){
            showAlert("File Error before Start");
            return;
        }

        /*
        Fetching Addresses
         */
        if ( rdbtnLoop.isSelected() ){
            int startingAddress =0;
            int endingAddress = 0;
            int loopAddress = 0;
            // Starting Address
            try {
                startingAddress=(int)Double.parseDouble(startAddIn.getText());
            } catch (Exception e){
                showAlert("Enter Valid Starting Address.(Integer only)");
                return;
            }
            // Ending Address
            try {
                endingAddress=(int)Double.parseDouble(endAddIn.getText());
            } catch (Exception e){
                showAlert("Enter Valid Ending Address.(Integer only)");
                return;
            }
            // Loop Count
            try {
                loopAddress=(int)Double.parseDouble(loopCountIn.getText());
            } catch (Exception e){
                showAlert("Enter Valid Loop Count.(Integer only)");
                return;
            }
            for(int i = 0 ; i < loopAddress ; i++){
                for (int j = startingAddress ; j <= endingAddress ; j++){
                    if(hitOrMiss(j)){
                        cacheHit++;
                    } else {
                        cacheMiss++;
                    }
                }
            }

        }
        else {
            String random =addArrayIn.getText();
            String temp = "";
            for (int i = 0 ; i < random.length() ; i++){
                if (random.charAt(i) >= '0' && random.charAt(i) <= '9'){
                    temp += random.charAt(i);
                }
                else if(random.charAt(i) == ','){
                    if(hitOrMiss( (int)Double.parseDouble(temp) ) ){
                        cacheHit++;
                    } else {
                        cacheMiss++;
                    }
                    temp="";
                }
                else{
                    continue;
                }
            }
            if(hitOrMiss( (int)Double.parseDouble(temp) ) ){
                cacheHit++;
            } else {
                cacheMiss++;
            }
            temp="";
        }
        /*
        Showing Detailed Result
         */
        missLabel.setText(cacheMiss+"");
        hitLabel.setText(cacheHit+"");
        totalLabel.setText(cacheMiss + cacheHit+"");
        hitRateLabel.setText( (Math.round(((cacheHit*1.0/(cacheMiss + cacheHit+0.0))*100)*100))/100.0 + "%");
    }
    /*
    Reading Detailed Output from a file
     */
    @FXML
    private void loadFile(){
        try{
            Runtime rt=Runtime.getRuntime();

            String file="Output.txt";

            Process p=rt.exec("notepad "+file);
        } catch (Exception e){
            showAlert("File Error At End Showing Output");
        }
    }
    /*
    Tell if Cache Hit or Miss
     */
    private boolean hitOrMiss(int address){
        String add = toBinary(address,addressLength);
        String temp ="";
        for (int i = tagBitLength; i<blockBitLength+tagBitLength ;i++ ){temp += add.charAt(i);}
        int block = toDecimal(temp);
        temp ="";
        for (int i = 0 ; i < tagBitLength ;i++){temp += add.charAt(i);}
        int tag = toDecimal(temp);
        if(cache[block].isValid() &&
                tag == cache[block].getTag() ) {
            appendFile(address,true,block);
            return true;
        } else {
            appendFile(address,false,block);
            cache[block].setValidBit(true);
            cache[block].setTag(tag);
            return false;
        }
    }
    private void appendFile(int address,boolean b,int block){
        blockDataBefore = blockDataAfter;
        blockDataAfter=((address-(address%8))+" - "+(address+(7-(address%8))));
        try{
            PrintWriter pw = new PrintWriter(new FileWriter("Output.txt",true));
            if(b){
                pw.printf("%10s|%30s|%10s|%20s|%15s|%20s|%n",
                        address,toBinary(address,addressLength),block,blockDataBefore,"Hit",
                        blockDataAfter);
            }else {
                pw.printf("%10s|%30s|%10s|%20s|%15s|%20s|%n",
                        address,toBinary(address,addressLength),block,blockDataBefore,"Miss",
                        blockDataAfter);
            }
            pw.close();
        } catch (Exception e){
            showAlert("File Error During Hit Or Miss");
        }
    }
   /*
   Initialize Variables
    */
    public void init(){
        this.ramSize=0;
        this.cacheSize=0;
        this.blockSize=0;
        this.noOfBlocks=0;
        this.addressLength=0;
        this.blockBitLength=0;
        this.offsetBitLength=0;
        this.tagBitLength=0;
        this.blockDataBefore="";
        this.blockDataAfter="";
    }

    /*
    Logarithm with custom base
     */
    private double logCustomBase(double base,double x) {
        double a = Math.log(x);
        double b = Math.log(base);

        return a / b;
    }
    /*
     * Converting the number into Binary Number
     */
    public static String toBinary(int number,int addressLength) {
        String ans="";
        while (number>=1) {
            ans += number % 2 + "";
            number/=2;
        }
        ans = reverseString(ans);
        while(ans.length() < addressLength) {
            ans = '0'+ans;
        }
        return ans;
    }
    /*
     * Convert Binary number to Decimal
     */
    public static int toDecimal(String binaryNumber) {
        int ans=0,j=binaryNumber.length()-1;
        for (int i = 0 ; i < binaryNumber.length() ; i ++) {
            if(binaryNumber.charAt(i)=='1')
                ans += (int)Math.pow(2, j-i);
        }
        return ans;
    }
    /*
     * Reversing the string
     */
    public static String reverseString(String string) {
        String ans="";
        for (int i = string.length()-1 ; i >=0  ; i --) {
            ans += string.charAt(i);
        }
        return ans;
    }

}

