function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Hello World
        </h1>
        <p className="text-gray-600 text-center">
          Tailwind CSS가 성공적으로 설정되었습니다! 🎉
        </p>
        <button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
          Click me!
        </button>
      </div>
    </div>
  );
}

export default App;
