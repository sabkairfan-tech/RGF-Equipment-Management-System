  {/* Login Card */}
        <div>
          <div className="">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full shadow-lg">
            <ShieldCheck size={40} className="text-white" />
          </div>

          <h1 className="mt-4 text-3xl font-bold text-slate-800">
            Equipment Management
          </h1>

          <p className="text-slate-500 mt-2">
            Sign in to continue
          </p>
        </div>
           <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleLogin}>

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter Username"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="w-full border rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            >
              Sign In
            </button>

          </form>
        </div>
        </div>
       
      </div>