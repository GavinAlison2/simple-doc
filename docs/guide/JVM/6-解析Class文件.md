# 解析Class文件

![class](assets/class1.png)
![常量池](assets/class2.png)

```java
public class TestTClassCode{
    public String a;
    public String b;
    public static int add(int a, int b){
        return a + b;
    }

    public static void main(String[] args){
        int c = add(1, 2);
        System.out.println(c);
    }
}
```

![解析的字节码](assets/class3.png)
