# Stitch export – PetVesta Landing Page

Export of **PetVesta - Final Deploy-Ready Masterpiece** from Stitch (project ID `15740684377947103030`, screen ID `87bc53aac7d1491ca5d6ac8b4e6a6253`).

## Contents

- **screens/PetVesta-Final-Deploy-Ready-Masterpiece/**
  - `PetVesta-Final-Deploy-Ready-Masterpiece.png` – screenshot (downloaded with `curl -L` from Stitch)
  - `PetVesta-Final-Deploy-Ready-Masterpiece.html` – placeholder (see below)
  - `screen_metadata.json` – full screen metadata and hosted URLs from Stitch MCP `get_screen`

## HTML code

The HTML export URL from Stitch (`htmlCode.downloadUrl` in `screen_metadata.json`) requires browser/session authentication. It cannot be downloaded with a plain `curl` call.

To get the HTML/CSS code:

1. Open the project in Stitch:  
   **https://stitch.withgoogle.com/projects/15740684377947103030**
2. Open the screen **PetVesta - Final Deploy-Ready Masterpiece** and use the in-app export/code download, or
3. While logged into the same Google account, open the `htmlCode.downloadUrl` from `screen_metadata.json` in your browser and save the file as `PetVesta-Final-Deploy-Ready-Masterpiece.html` in this folder.

## Re-exporting (screenshot)

To re-download the screenshot only (public URL):

```bash
curl -L -o "screens/PetVesta-Final-Deploy-Ready-Masterpiece/PetVesta-Final-Deploy-Ready-Masterpiece.png" \
  "https://lh3.googleusercontent.com/aida/AOfcidWHW3Z7JcLr7yJtUiNkvPPpaCe_y3kVmwWpujtULjJfNU-Yqccam3890yBlJjwER_TU2R3quBsI4X2Nwl1jlRi8PlCQt5ibcq-ajaaWmX-7jh5EjCArBMmqVr4zMVK5a960yWS-PTo31DlrC6lBZGzEoCO16_jQGdw8K65rXAG3Q9AfVp-wo7aDOIFrnDE9CjNdsMQebt_17DPbIdzmvwpZ6dvnAfC9J_Xhi6liwzW6qaI_dTxl-NGp5vsm"
```

To fetch fresh metadata and screenshot via Stitch MCP, use the script in `scripts/fetch-stitch-screen.sh` (requires `STITCH_API_KEY` or MCP config).
