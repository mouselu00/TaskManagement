using Dapper;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.Common;
using System.Diagnostics;
using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using TaskManagement.Models;
using TaskManagement.Repositorys;
using TaskManagement.Services;
using TaskManagement.Services.Interfaces;
using TaskManagement.ViewModels;

namespace TaskManagement.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IMapper _mapper;
        private readonly IMemoryCache _cache;
        private readonly string cacheKey = "TaskDatas";
        private readonly ITaskDataService _taskDataService;

        public HomeController(ILogger<HomeController> logger, IMapper mapper, IMemoryCache cache, ITaskDataService taskDataService)
        {
            _logger = logger;
            _mapper = mapper;
            _cache = cache;
            _taskDataService = taskDataService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var taskDatas = await _taskDataService.SearchAsync();

            // Mapping
            var TaskDataList = _mapper.Map<IEnumerable<TaskDataItemViewModel>>(taskDatas);
            //var TaskDataList = taskDatas.Select(x => new TaskDataItemViewModel
            //{
            //    Id = x.Id,
            //    ProjectName = x.ProjectName,
            //    UserName = x.UserName,
            //    Description = x.Description,
            //    Created = x.Created
            //});


            return View(new TaskDataCollectionViewModel
            {
                TaskDataList = TaskDataList
            });

        }

        [HttpPost]
        public async Task<IActionResult> Index([FromForm] TaskDataFormViewModel parameter)
        {
            if (!ModelState.IsValid)
            {

                var taskDatas = await _taskDataService.SearchAsync();

                // Mapping
                var TaskDataList = _mapper.Map<IEnumerable<TaskDataItemViewModel>>(taskDatas);

                return View("Index", new TaskDataCollectionViewModel
                {
                    TaskDataFrom = parameter,
                    TaskDataList = TaskDataList
                });
            }

            // Mapping
            var addTaskData = _mapper.Map<TaskData>(parameter);

            await _taskDataService.AddAsync(addTaskData);
            return RedirectToAction("Index");
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] TaskDataFormViewModel parameter)
        {
            // bypass the validation DataAnnotation
            ModelState.Remove("Created");
            ModelState.Remove("UserName");
            ModelState.Remove("ProjectName");

            var taskDatas = await _taskDataService.SearchAsync();
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

            // Mapping
            var TaskDataList = _mapper.Map<IEnumerable<TaskDataItemViewModel>>(taskDatas);

            return View("Index", new TaskDataCollectionViewModel
            {
                TaskDataFrom = parameter,
                TaskDataList = TaskDataList
            });
        }

        [HttpPost]
        public async Task<IActionResult> Delete([FromBody] TaskDataFormViewModel parameter)
        {
            if (parameter?.Id != null)
            {
                await _taskDataService.RemoveAsync(parameter.Id);
            }
            var taskDatas = await _taskDataService.SearchAsync();

            // Mapping
            var TaskDataList = _mapper.Map<IEnumerable<TaskDataItemViewModel>>(taskDatas);

            return PartialView("_TablePartial", TaskDataList); ;
        }

        [HttpGet]
        public async Task<IActionResult> Edit([FromRoute] string id)
        {
            var taskDatas = await _taskDataService.SearchAsync();
            var taskData = taskDatas.Where(x => x.Id.Equals(Guid.Parse(id))).FirstOrDefault<TaskData>();

            //Mapping
            var searchTaskData = taskData != null ? _mapper.Map<TaskDataFormViewModel>(taskData) : new TaskDataFormViewModel();
            var TaskDataList = _mapper.Map<IEnumerable<TaskDataItemViewModel>>(taskDatas);

            return View("Index", new TaskDataCollectionViewModel
            {
                TaskDataFrom = searchTaskData,
                TaskDataList = TaskDataList,
                isEdit = true
            });
        }

        [HttpPost]
        public async Task<IActionResult> Edit([FromForm] TaskDataFormViewModel parameter)
        {
            if (!ModelState.IsValid)
            {
                var taskDatas = await _taskDataService.SearchAsync();

                // Mapping
                var TaskDataList = _mapper.Map<IEnumerable<TaskDataItemViewModel>>(taskDatas);

                return View("Index", new TaskDataCollectionViewModel
                {
                    TaskDataFrom = parameter,
                    TaskDataList = TaskDataList,
                    isEdit = true,
                });
            }
            // Mapping
            var editTaskData = _mapper.Map<TaskData>(parameter);
            await _taskDataService.UpdateAsync(editTaskData);
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
