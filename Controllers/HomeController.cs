using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.Common;
using System.Diagnostics;
using System.Threading.Tasks;
using TaskManagement.Models;
using TaskManagement.Repositorys;

namespace TaskManagement.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration _configuration;
        private readonly IMemoryCache _cache;
        private readonly string cacheKey = "TaskDatas";
        private readonly IDbConnection _connection;

        public HomeController(ILogger<HomeController> logger, IConfiguration configuration, IMemoryCache cache)
        {
            _logger = logger;
            _configuration = configuration;
            _connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            _cache = cache;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var tdr = new TaskDataRepository(_configuration);
            var taskDatas = await tdr.GetDataAllAsync();
            return View(new TaskDataViewModel
            {
                TaskDatas = taskDatas
            });

        }

        [HttpPost]
        public async Task<IActionResult> Index([FromForm] TaskData parameter)
        {
            var tdr = new TaskDataRepository(_configuration);
            if (!ModelState.IsValid)
            {

                var taskDatas = await tdr.GetDataAllAsync();
                return View("Index", new TaskDataViewModel
                {
                    TaskData = parameter,
                    TaskDatas = taskDatas
                });
            }
            await tdr.InsertAsync(parameter);
            return RedirectToAction("Index");
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] TaskData parameter)
        {
            // bypass the validation DataAnnotation
            ModelState.Remove("Created");
            ModelState.Remove("UserName");
            ModelState.Remove("ProjectName");
            var tdr = new TaskDataRepository(_configuration);

            var taskDatas = await tdr.GetDataAllAsync();
            if (parameter.Created != null)
            {
                taskDatas = taskDatas.Where(x => x.Created?.ToString("yyyy-MM-dd") == parameter.Created?.ToString("yyyy-MM-dd")).ToList();
            }
            if (!string.IsNullOrEmpty(parameter.UserName))
            {
                taskDatas = taskDatas.Where(x => x.UserName?.ToString() == parameter.UserName?.ToString()).ToList();
            }

            if (!string.IsNullOrEmpty(parameter.ProjectName))
            {
                taskDatas = taskDatas.Where(x => x.ProjectName?.ToString() == parameter.ProjectName?.ToString()).ToList();
            }

            return View("Index", new TaskDataViewModel
            {
                TaskData = parameter,
                TaskDatas = taskDatas
            });
        }

        [HttpPost]
        public async Task<IActionResult> Delete([FromBody] TaskData parameter)
        {
            var tdr = new TaskDataRepository(_configuration);

            if (parameter?.Id != null)
            {
                await tdr.DeleteAsync(parameter.Id);
            }
            var taskDatas = await tdr.GetDataAllAsync();
            return PartialView("_TablePartial", taskDatas); ;
        }

        [HttpGet]
        public async Task<IActionResult> Edit([FromRoute] string id)
        {
            var tdr = new TaskDataRepository(_configuration);
            var taskDatas = await tdr.GetDataAllAsync();
            var taskData = taskDatas.Where(x => x.Id.Equals(Guid.Parse(id))).FirstOrDefault<TaskData>();
            return View("Index", new TaskDataViewModel
            {
                TaskData = taskData ?? new TaskData(),
                TaskDatas = taskDatas,
                isEdit = true
            });
        }

        [HttpPost]
        public async Task<IActionResult> Edit([FromForm] TaskData parameter)
        {
            var tdr = new TaskDataRepository(_configuration);
            if (!ModelState.IsValid)
            {
                var taskDatas = await tdr.GetDataAllAsync();
                return View("Index", new TaskDataViewModel
                {
                    TaskData = parameter,
                    TaskDatas = taskDatas,
                    isEdit = true,
                });
            }
            if (await tdr.DeleteAsync(parameter.Id) > 0)
            {
                await tdr.InsertAsync(parameter);
            }
            return RedirectToAction("Index");
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


        #region cache
        //private List<TaskData> SetFakeData()
        //{
        //    // faske data
        //    List<TaskData> taskDatas = new List<TaskData>
        //    {
        //        new TaskData{ UserName="小明" , ProjectName="部落格管理系統" , Description="信件處理"},
        //        new TaskData{ UserName="小明" , ProjectName="電商管理系統" , Description="遠端更新"},
        //    };
        //    return taskDatas;
        //}

        //private List<TaskData> getCacheData()
        //{
        //    List<TaskData> taskDatas = new List<TaskData>();
        //    var cacheEntryOption = new MemoryCacheEntryOptions()
        //          .SetSlidingExpiration(TimeSpan.FromMinutes(1))
        //          .SetAbsoluteExpiration(TimeSpan.FromMinutes(2))
        //          .SetPriority(CacheItemPriority.Normal);

        //    if (!_cache.TryGetValue(cacheKey, out IEnumerable<TaskData>? items))
        //    {
        //        // faske data
        //        taskDatas = SetFakeData();
        //        _cache.Set<List<TaskData>>(cacheKey, taskDatas, cacheEntryOption);
        //    }
        //    if (items != null)
        //    {
        //        taskDatas = items.ToList();
        //        _cache.Remove(cacheKey);
        //        _cache.Set<List<TaskData>>(cacheKey, taskDatas, cacheEntryOption);
        //    }

        //    return taskDatas;
        //}
        //private TaskData getCacheData(Guid Id)
        //{
        //    List<TaskData> taskDatas = new List<TaskData>();
        //    var cacheEntryOption = new MemoryCacheEntryOptions()
        //          .SetSlidingExpiration(TimeSpan.FromMinutes(1))
        //          .SetAbsoluteExpiration(TimeSpan.FromMinutes(2))
        //          .SetPriority(CacheItemPriority.Normal);

        //    if (!_cache.TryGetValue(cacheKey, out IEnumerable<TaskData>? items))
        //    {
        //        // faske data
        //        taskDatas = SetFakeData();
        //        _cache.Set<List<TaskData>>(cacheKey, taskDatas, cacheEntryOption);
        //    }
        //    if (items != null)
        //    {
        //        taskDatas = items.ToList();
        //        _cache.Remove(cacheKey);
        //        _cache.Set<List<TaskData>>(cacheKey, taskDatas, cacheEntryOption);
        //    }
        //    int index = taskDatas.FindIndex(taskData => taskData.Id == Id);

        //    return taskDatas[index];
        //}

        //private void addCacheData(TaskData parameter)
        //{
        //    List<TaskData> taskDatas = new List<TaskData>();
        //    var cacheEntryOption = new MemoryCacheEntryOptions()
        //          .SetSlidingExpiration(TimeSpan.FromMinutes(1))
        //          .SetAbsoluteExpiration(TimeSpan.FromMinutes(2))
        //          .SetPriority(CacheItemPriority.Normal);

        //    if (!_cache.TryGetValue(cacheKey, out IEnumerable<TaskData>? items))
        //    {
        //        // faske data
        //        taskDatas = SetFakeData();
        //    }
        //    if (items != null)
        //    {
        //        taskDatas = items.ToList();
        //    }
        //    taskDatas.Add(parameter);
        //    _cache.Remove(cacheKey);
        //    _cache.Set<List<TaskData>>(cacheKey, taskDatas, cacheEntryOption);
        //}

        //private void deleteCacheData(Guid Id)
        //{
        //    List<TaskData> taskDatas = new List<TaskData>();
        //    var cacheEntryOption = new MemoryCacheEntryOptions()
        //          .SetSlidingExpiration(TimeSpan.FromMinutes(1))
        //          .SetAbsoluteExpiration(TimeSpan.FromMinutes(2))
        //          .SetPriority(CacheItemPriority.Normal);

        //    if (!_cache.TryGetValue(cacheKey, out IEnumerable<TaskData>? items))
        //    {
        //        // faske data
        //        taskDatas = SetFakeData();
        //    }
        //    if (items != null)
        //    {
        //        taskDatas = items.ToList();
        //    }
        //    int index = taskDatas.FindIndex(taskData => taskData.Id == Id);
        //    if (index >= 0)
        //    {
        //        taskDatas.RemoveAt(index);
        //    }
        //    _cache.Remove(cacheKey);
        //    _cache.Set<List<TaskData>>(cacheKey, taskDatas, cacheEntryOption);
        //}

        #endregion
    }
}
