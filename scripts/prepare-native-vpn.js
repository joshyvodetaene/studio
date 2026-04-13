
const fs = require('fs');
const path = require('path');

/**
 * Torro PRO — Native Android Bridge Automator
 * Dieses Script injiziert den VpnService und modifiziert das Manifest.
 */

const androidManifestPath = path.join(__dirname, '../android/app/src/main/AndroidManifest.xml');
const javaPath = path.join(__dirname, '../android/app/src/main/java/com/torro/pro/MyVpnService.java');

// 1. Erstelle die Java-Klasse für den VpnService
const vpnServiceContent = `package com.torro.pro;

import android.net.VpnService;
import android.content.Intent;
import android.os.ParcelFileDescriptor;
import android.util.Log;

public class MyVpnService extends VpnService {
    private static final String TAG = "TorroVpnService";
    private ParcelFileDescriptor vpnInterface = null;

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d(TAG, "VPN Handshake initiated...");
        
        // Hier wird der systemweite Tunnel vorbereitet
        Builder builder = new Builder();
        builder.setSession("Torro PRO Tunnel")
               .addAddress("10.0.0.1", 24)
               .addDnsServer("1.1.1.1")
               .addRoute("0.0.0.0", 0);
               
        try {
            vpnInterface = builder.establish();
            Log.d(TAG, "VPN Interface established. Key symbol should appear.");
        } catch (Exception e) {
            Log.e(TAG, "Failed to establish VPN", e);
        }
        
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        if (vpnInterface != null) {
            try { vpnInterface.close(); } catch (Exception e) {}
            vpnInterface = null;
        }
        super.onDestroy();
    }
}`;

if (!fs.existsSync(path.dirname(javaPath))) {
    fs.mkdirSync(path.dirname(javaPath), { recursive: true });
}
fs.writeFileSync(javaPath, vpnServiceContent);
console.log('✔ Native VpnService.java injected.');

// 2. Modifiziere die AndroidManifest.xml
if (fs.existsSync(androidManifestPath)) {
    let manifest = fs.readFileSync(androidManifestPath, 'utf8');
    
    const serviceTag = `
        <service android:name=".MyVpnService"
            android:permission="android.permission.BIND_VPN_SERVICE"
            android:exported="false">
            <intent-filter>
                <action android:name="android.net.VpnService"/>
            </intent-filter>
        </service>`;

    if (!manifest.includes('MyVpnService')) {
        manifest = manifest.replace('</activity>', '</activity>' + serviceTag);
        fs.writeFileSync(androidManifestPath, manifest);
        console.log('✔ AndroidManifest.xml updated with VpnService.');
    } else {
        console.log('- VpnService already present in Manifest.');
    }
} else {
    console.error('✘ AndroidManifest.xml not found at ' + androidManifestPath);
}
