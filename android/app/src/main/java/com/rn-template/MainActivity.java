package com.rn;


import android.os.Bundle;
import android.widget.ImageView;

import com.imagepicker.permissions.OnImagePickerPermissionsCallback; // <- add this import
import com.facebook.react.modules.core.PermissionListener; // <- add this import

import com.reactnativecomponent.splashscreen.RCTSplashScreen;
import com.reactnativenavigation.NavigationActivity;


public class MainActivity extends NavigationActivity implements OnImagePickerPermissionsCallback{

     private PermissionListener listener; 

      @Override
  public void setPermissionListener(PermissionListener listener)
  {
    this.listener = listener;
  }

    @Override
  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults)
  {
    if (listener != null)
    {
      listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
  }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        //RCTSplashScreen.openSplashScreen(this);   //open splashscreen
        RCTSplashScreen.openSplashScreen(this, true, ImageView.ScaleType.CENTER_CROP);   //open splashscreen fullscreen
        super.onCreate(savedInstanceState);
    }
}
