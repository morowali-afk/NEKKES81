#!/usr/bin/env bash
set -e

APP_DIR="$HOME/.local/share/laihakerai-pentest-assistant"
BIN_DIR="$HOME/.local/bin"
DESKTOP_DIR="$HOME/.local/share/applications"

echo "[+] Installing dependencies for LaiHakerAI Pentest Assistant..."
DEPS=(nmap nikto sqlmap metasploit-framework burpsuite python3-tk testssl.sh theharvester subfinder whatweb nuclei)
if sudo -n true 2>/dev/null; then
  sudo apt update
  sudo apt install -y "${DEPS[@]}"
else
  echo "[!] sudo tanpa password tidak tersedia. Lewati apt install otomatis."
  echo "[!] Jika ada dependency yang belum ada, jalankan manual:"
  echo "    sudo apt update && sudo apt install -y ${DEPS[*]}"
fi

echo "[+] Checking tools..."
for tool in nmap nikto sqlmap msfconsole burpsuite testssl theHarvester subfinder whatweb nuclei; do
  if command -v "$tool" >/dev/null 2>&1; then
    echo "    $tool: OK"
  else
    echo "    $tool: NOT FOUND"
  fi
done

echo "[+] Installing application files..."
mkdir -p "$APP_DIR" "$BIN_DIR" "$DESKTOP_DIR"
cp kali_pentest_assistant.py README.md "$APP_DIR/"
chmod +x kali_pentest_assistant.py

cat > "$BIN_DIR/laihakerai-pentest-assistant" <<EOF
#!/usr/bin/env bash
exec python3 "$APP_DIR/kali_pentest_assistant.py" "\$@"
EOF
chmod +x "$BIN_DIR/laihakerai-pentest-assistant"

sed "s|Exec=.*|Exec=$BIN_DIR/laihakerai-pentest-assistant|" kali_pentest_assistant.desktop > "$DESKTOP_DIR/laihakerai-pentest-assistant.desktop"

echo "[+] Done."
echo "Run with:"
echo "laihakerai-pentest-assistant"
echo
echo "If the command is not found, add this to PATH:"
echo "export PATH=\"\$HOME/.local/bin:\$PATH\""
