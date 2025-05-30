import axios from 'axios';

// 全局变量，用于存储当前的 AbortController
let currentAbortController = null;

/**
 * 发起可取消的请求
 * @param {string} url 请求地址
 * @param {Object} options 请求配置（可选）
 * @returns {Promise} 返回 Axios 的 Promise
 */
function sendRequest(url, options = {}) {
  // 如果之前有未完成的请求，先取消它
  if (currentAbortController) {
    currentAbortController.abort();
    console.log('【取消上一次请求】');
  }

  // 创建新的 AbortController
  const abortController = new AbortController();
  currentAbortController = abortController;

  // 发起请求，并传入 signal
  return axios({
    url,
    ...options,
    signal: abortController.signal, // 关键：传入 signal 用于取消
  }).finally(() => {
    // 请求完成后（无论成功或失败），清除当前的 AbortController
    if (currentAbortController === abortController) {
      currentAbortController = null;
    }
  });
}

// 模拟用户输入搜索关键词（快速连续输入）
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', async (e) => {
  const query = e.target.value;
  
  try {
    const result = await sendRequest(`/api/search?q=${query}`);
    console.log('【搜索结果】:', result.data);
    // 更新 UI 显示结果
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('【请求被取消】:', error.message);
    } else {
      console.error('【请求出错】:', error);
    }
  }
});