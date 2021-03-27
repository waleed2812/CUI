package sample;


public class Block {
    private boolean validBit;
    private int tag;
    private byte[] data=new byte[8];
    public Block(boolean validBit,int tag,byte[] data) {
        setTag(tag);
        setValidBit(validBit);
        setData(data);
    }
    /**
     * @return the validBit
     */
    public boolean isValid() {
        return validBit;
    }
    /**
     * @param validBit the validBit to set
     */
    public void setValidBit(boolean validBit) {
        this.validBit = validBit;
    }
    /**
     * @return the tag
     */
    public int getTag() {
        return tag;
    }
    /**
     * @param tag the tag to set
     */
    public void setTag(int tag) {
        this.tag = tag;
    }
    /**
     * @return the data
     */
    public byte[] getData() {
        return this.data;
    }
    /**
     * @param data the data to set
     */
    public void setData(byte[] data) {
        for(int i = 0 ; i < this.data.length ; i++)
            this.data[i] = data[0];
    }
}
