package com.grocerylist;

import android.widget.Toast;
import android.view.Gravity;
import android.util.Log;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

public class ToastModule extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;

  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";

  // Loads our custom library from cpp
  static {
    try {
      System.loadLibrary("grocerylist-cpp");
      Log.d("ToastModule", "-------- libgrocerylist-cpp: loaded");
    } catch (Exception e){
      Log.d("ToastModule", "-------- libgrocerylist-cpp: failed to load");
    }
  }

  // leads to JNI function name "Java_com_grocerylist_ToastModule_getCppMessage"
  public static native String getCppMessage();

  ToastModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }


  @Override
  public String getName() {
    return "MyToastExample";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
    constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
    return constants;
  }

  @ReactMethod
  public void show(String message, int duration) {
    String arrow = "-------> ";
    String finalMessage = arrow + message + "\n" + arrow + "This is from JAVA\n" + arrow + getCppMessage();
    Toast toast = Toast.makeText(getReactApplicationContext(), finalMessage, duration);
    toast.setGravity(Gravity.CENTER, 0, 0);
    toast.show();
  }

}