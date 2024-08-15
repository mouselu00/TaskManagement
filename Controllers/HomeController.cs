using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Threading.Tasks;
using TaskManagement.Models;

namespace TaskManagement.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IMemoryCache _cache;
        private readonly string cacheKey = "TaskDatas";

        public HomeController(ILogger<HomeController> logger, IMemoryCache cache)
        {
            _logger = logger;
            _cache = cache;
        }

        [HttpGet]
        public IActionResult Index()
        {
            List<TaskData> taskDatas = getCacheData();
            return View(new TaskDataViewModel
            {
                TaskDatas = taskDatas
            });

        }


        [HttpPost]
        public IActionResult Index([FromForm] TaskData parameter)
        {
            if (!ModelState.IsValid)
            {
                List<TaskData> taskDatas = getCacheData();
                return View("Index", new TaskDataViewModel
                {
                    TaskData = parameter,
                    TaskDatas = taskDatas
                });
            }
            addCacheData(parameter);
            return RedirectToAction("Index");
        }

        public IActionResult Search([FromQuery] TaskData parameter)
        {
            // bypass the validation DataAnnotation
            ModelState.Remove("Created");
            ModelState.Remove("UserName");
            ModelState.Remove("ProjectName");

            List<TaskData> taskDatas = getCacheData();
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



        public IActionResult Delete([FromBody] TaskData parameter)
        {
            if (parameter?.Id != null)
            {
                deleteCacheData(parameter.Id);
            }
            List<TaskData> taskDatas = getCacheData();
            return PartialView("_TablePartial", taskDatas); ;
        }

        public IActionResult Edit([FromRoute] string id)
        {
            List<TaskData> taskDatas = getCacheData();
            int index = taskDatas.FindIndex(taskData => taskData.Id == new Guid(id));
            return View("Index", new TaskDataViewModel
            {
                TaskData = taskDatas[index],
                TaskDatas = taskDatas,
                isEdit = true
            });
        }

        [HttpPost]
        public IActionResult Edit([FromForm] TaskData parameter)
        {
            if (!ModelState.IsValid)
            {
                List<TaskData> taskDatas = getCacheData();
                return View("Index", new TaskDataViewModel
                {
                    TaskData = parameter,
                    TaskDatas = taskDatas,
                    isEdit = true,
                });
            }
            deleteCacheData(parameter.Id);
            addCacheData(parameter);
            return RedirectToAction("Index");
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


        #region Service
        private List<TaskData> SetFakeData()
        {
            // faske data
            List<TaskData> taskDatas = new List<TaskData>
            {
                new TaskData{ UserName="小明" , ProjectName="部落格管理系統" , Description="信件處理"},
                new TaskData{ UserName="小明" , ProjectName="電商管理系統" , Description="遠端更新"},
            };
            return taskDatas;
        }

        private List<TaskData> getCacheData()
        {
            List<TaskData> taskDatas = new List<TaskData>();
            var cacheEntryOption = new MemoryCacheEntryOptions()
                  .SetSlidingExpiration(TimeSpan.FromMinutes(1))
                  .SetAbsoluteExpiration(TimeSpan.FromMinutes(2))
                  .SetPriority(CacheItemPriority.Normal);

            if (!_cache.TryGetValue(cacheKey, out IEnumerable<TaskData>? items))
            {
                // faske data
                taskDatas = SetFakeData();
                _cache.Set<List<TaskData>>(cacheKey, taskDatas, cacheEntryOption);
            }
            if (items != null)
            {
                taskDatas = items.ToList();
                _cache.Remove(cacheKey);
                _cache.Set<List<TaskData>>(cacheKey, taskDatas, cacheEntryOption);
            }

            return taskDatas;
        }
        private TaskData getCacheData(Guid Id)
        {
            List<TaskData> taskDatas = new List<TaskData>();
            var cacheEntryOption = new MemoryCacheEntryOptions()
                  .SetSlidingExpiration(TimeSpan.FromMinutes(1))
                  .SetAbsoluteExpiration(TimeSpan.FromMinutes(2))
                  .SetPriority(CacheItemPriority.Normal);

            if (!_cache.TryGetValue(cacheKey, out IEnumerable<TaskData>? items))
            {
                // faske data
                taskDatas = SetFakeData();
                _cache.Set<List<TaskData>>(cacheKey, taskDatas, cacheEntryOption);
            }
            if (items != null)
            {
                taskDatas = items.ToList();
                _cache.Remove(cacheKey);
                _cache.Set<List<TaskData>>(cacheKey, taskDatas, cacheEntryOption);
            }
            int index = taskDatas.FindIndex(taskData => taskData.Id == Id);

            return taskDatas[index];
        }


        private void addCacheData(TaskData parameter)
        {
            List<TaskData> taskDatas = new List<TaskData>();
            var cacheEntryOption = new MemoryCacheEntryOptions()
                  .SetSlidingExpiration(TimeSpan.FromMinutes(1))
                  .SetAbsoluteExpiration(TimeSpan.FromMinutes(2))
                  .SetPriority(CacheItemPriority.Normal);

            if (!_cache.TryGetValue(cacheKey, out IEnumerable<TaskData>? items))
            {
                // faske data
                taskDatas = SetFakeData();
            }
            if (items != null)
            {
                taskDatas = items.ToList();
            }
            taskDatas.Add(parameter);
            _cache.Remove(cacheKey);
            _cache.Set<List<TaskData>>(cacheKey, taskDatas, cacheEntryOption);
        }

        private void deleteCacheData(Guid Id)
        {
            List<TaskData> taskDatas = new List<TaskData>();
            var cacheEntryOption = new MemoryCacheEntryOptions()
                  .SetSlidingExpiration(TimeSpan.FromMinutes(1))
                  .SetAbsoluteExpiration(TimeSpan.FromMinutes(2))
                  .SetPriority(CacheItemPriority.Normal);

            if (!_cache.TryGetValue(cacheKey, out IEnumerable<TaskData>? items))
            {
                // faske data
                taskDatas = SetFakeData();
            }
            if (items != null)
            {
                taskDatas = items.ToList();
            }
            int index = taskDatas.FindIndex(taskData => taskData.Id == Id);
            if (index >= 0)
            {
                taskDatas.RemoveAt(index);
            }
            _cache.Remove(cacheKey);
            _cache.Set<List<TaskData>>(cacheKey, taskDatas, cacheEntryOption);
        }

        #endregion 
    }
}
