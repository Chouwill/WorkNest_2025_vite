<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <!-- 標題 -->
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-900">登入</h2>
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
  
          <!-- UID -->
          <div>
            <label for="uid" class="block text-sm font-medium text-gray-700">UID</label>
            <input 
              type="text" 
              id="uid" 
              class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="UID"
              value=""
              readonly
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
              placeholder="暱稱"
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
            >
          </div>
  
          <!-- 記住我和忘記密碼 -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="remember-me" 
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              >
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">記住我</label>
            </div>
            <div class="text-sm">
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500">忘記密碼？</a>
            </div>
          </div>
  
          <!-- 登入按鈕 -->
          <div>
            <button 
              type="submit" 
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              登入
            </button>
          </div>
  
          <!-- 註冊連結 -->
          <div class="text-sm text-center text-gray-600">
            還沒有帳號？
            <a href="#" class="font-medium text-blue-600 hover:text-blue-500">立即註冊</a>
          </div>
        </form>
      </div>
    </div>
  </template>