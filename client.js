'use strict';

function dataset() {
  return {
    signupUsername: '',
    signupPassword: '',
    loginUsername: '',
    loginPassword: '',
    result: 'ここに結果が表示されます...',

    /* ユーザー登録 */
    async signup() {
      // POSTリクエスト
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.signupUsername, password: this.signupPassword })
      });

      const data = await res.json();
      this.result = data.message;
    },

    /* ログイン */
    async login() {
      // POSTリクエスト
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.loginUsername, password: this.loginPassword })
      });

      const data = await res.json();
      this.result = data.message;
      if (res.ok) {
        localStorage.jwt = data.token; // localStorageに保存
      }
    },

    /* プロフィールの取得 */
    async getProfile() {
      // localStorageからトークンを取得
      const token = localStorage.jwt;
      if (!token) {
        result.textContent = 'ログインしてください';
        return;
      }

      // GETリクエスト
      const res = await fetch('/api/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        this.result = 'ログインユーザー：' + data.username;
      } else {
        this.result = 'トークンが異なります';
      }
    },

    /* ログアウト */
    async logout() {
      if (localStorage.jwt) {
        delete localStorage.jwt;
        this.result = 'ログアウトしました';
      } else {
        this.result = 'ログインしていません';
      }
    }
  };
}