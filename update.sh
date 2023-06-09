#!/bin/bash

set -eo pipefail

REVEALED_GITHUB_URL="https://api.github.com/repos/BunnyStrike/revealed/releases/latest"
REVEALED_URL="$(curl -s ${REVEALED_GITHUB_URL} | grep -E 'browser_download_url.*AppImage' | cut -d '"' -f 4)"

APP_IMAGE_LAUNCHER_URL="https://github.com/TheAssassin/AppImageLauncher/releases/download/v2.2.0/appimagelauncher-lite-2.2.0-travis995-0f91801-x86_64.AppImage"

report_error() {
    FAILURE="$(caller): ${BASH_COMMAND}"
    echo "Something went wrong!"
    echo "Error at ${FAILURE}"
}

trap report_error ERR

# Kill DeckRevealed if it is running
killall -9 -q revealed || :
kill $(pgrep -f /home/deck/Applications/Revealed.AppImage) || :

# Installs Chrome and allows controller support
# flatpak install --system -y com.google.Chrome
# flatpak --user override --filesystem=/run/udev:ro com.google.Chrome

# Download and install DeckRevealed
curl -L "${REVEALED_URL}" -o ~/Applications/Revealed.AppImage 2>&1 | stdbuf -oL tr '\r' '\n' | sed -u 's/^ *\([0-9][0-9]*\).*\( [0-9].*$\)/\1\n#Download Speed\:\2/' | zenity --progress --title "Downloading Revealed App" --width 600 --auto-close --no-cancel 2>/dev/null
chmod +x ~/Applications/Revealed.AppImage
~/Applications/Revealed.AppImage