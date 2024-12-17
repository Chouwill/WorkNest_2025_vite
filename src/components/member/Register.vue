<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <!-- 標題 -->
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-900">註冊</h2>
        </div>
        
        <!-- 表單 -->
        <form class="space-y-6">
          <!-- 電子郵件 -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">電子郵件</label>
            <input 
              type="email" 
              id="email" 
              class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="請輸入電子郵件"
              value=""
            >
          </div>
  
          <!-- 密碼 -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">密碼</label>
            <input 
              type="password" 
              id="password" 
              class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="請輸入密碼"
              value=""
            >
          </div>
  
          <!-- 確認密碼 -->
          <div>
            <label for="confirm-password" class="block text-sm font-medium text-gray-700">確認密碼</label>
            <input 
              type="password" 
              id="confirm-password" 
              class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="請再次輸入密碼"
              value=""
            >
          </div>
  
          <!-- 暱稱 -->
          <div>
            <label for="nickname" class="block text-sm font-medium text-gray-700">暱稱</label>
            <input 
              type="text" 
              id="nickname" 
              class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="請輸入暱稱"
              value=""
            >
          </div>
  
          <!-- 同意條款 -->
          <div class="flex items-center">
            <input 
              type="checkbox" 
              id="terms" 
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            >
            <label for="terms" class="ml-2 block text-sm text-gray-900">
              我同意
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500">服務條款</a>
              和
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500">隱私政策</a>
            </label>
          </div>
  
          <!-- 註冊按鈕 -->
          <div>
            <button 
              type="submit" 
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              註冊
            </button>
          </div>
  
          <!-- 登入連結 -->
          <div class="text-sm text-center text-gray-600">
            已經有帳號？
            <a href="#" class="font-medium text-blue-600 hover:text-blue-500">立即登入</a>
          </div>
        </form>
      </div>
    </div>
  </template>