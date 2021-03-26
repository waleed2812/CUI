package sample;

import javafx.application.Application;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.ToggleButton;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import javafx.stage.Stage;

import java.awt.event.ActionEvent;

public class Main extends Application {

    static Stage primaryStage;
    @Override
    public void start(Stage primaryStage) throws Exception{
        this.primaryStage = primaryStage;
        Parent root = FXMLLoader.load(getClass().getResource("sample.fxml"));
        this.primaryStage.setTitle("Cache Simulator");
        this.primaryStage.setScene(new Scene(root, 1040 , 585));
        this.primaryStage.show();
        root.setOnKeyReleased(new EventHandler<KeyEvent>() {
            @Override
            public void handle(KeyEvent event) {
                switch (event.getCode()){
                    case F11:
                        if (Main.primaryStage.isFullScreen()){
                            Main.primaryStage.setFullScreen(false);
                        } else {
                            Main.primaryStage.setFullScreen(true);
                        }
                        break;
                }
            }
        });
    }


    public static void main(String[] args) {
        launch(args);
    }
}
