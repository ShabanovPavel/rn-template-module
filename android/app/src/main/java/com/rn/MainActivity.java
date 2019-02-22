package com.rn;

import android.os.Bundle;
import android.widget.ImageView;

import com.reactnativecomponent.splashscreen.RCTSplashScreen;
import com.reactnativenavigation.NavigationActivity;

public class MainActivity extends NavigationActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        RCTSplashScreen.openSplashScreen(this, true, ImageView.ScaleType.CENTER_CROP);  
        super.onCreate(savedInstanceState);
    }
}
