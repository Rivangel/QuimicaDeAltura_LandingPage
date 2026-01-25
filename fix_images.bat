@echo off
set SRC=C:\Users\villa\.gemini\antigravity\brain\e37dee6a-4b1e-427a-80c4-13b5cb3f719d
set DST=c:\Users\villa\Documents\GitHub\QuimicaDeAltura_LandingPage\public\resources\images
echo Copying...
copy /Y "%SRC%\uploaded_media_0_1769299220735.png" "%DST%\app_mockup_home.png"
copy /Y "%SRC%\uploaded_media_1_1769299220735.png" "%DST%\app_mockup_scan.png"
copy /Y "%SRC%\uploaded_media_2_1769299220735.png" "%DST%\app_mockup_chat.png"
dir "%DST%\app_mockup_*"
echo Done.
