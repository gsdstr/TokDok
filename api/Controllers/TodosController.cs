using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TodosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Todos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoView>>> GetTodos()
        {
            var todo = await _context.Todos.Include(e=> e.Tags).ToListAsync();
            return todo.ConvertAll(new Converter<Todo, TodoView>(TodoToTodoView));
        }

        private TodoView TodoToTodoView(Todo input)
        {
            var tags = input.Tags.Select(t => {return t.Title;}).ToArray();
            return new TodoView
            {
                Id = input.Id,
                Title = input.Title,
                IsComplete = input.IsComplete,
                Tags = tags
            };
        }

        private async Task<Todo> TodoViewToTodoAsync(TodoView input)
        {
            List<Tag> tags = [];
            //TODO add AddIfNotExists in DbContextExtensions
            foreach ( string tagTitle in input.Tags )
            {
                Tag? tag = await _context.Tag.FirstOrDefaultAsync(m => m.Title == tagTitle);
                // doesn't exist - firstOrDefault() returns default
                if ( tag == null || object.Equals(tag, default(Tag)))               
                {
                    tag = new Tag
                    {
                        Title = tagTitle
                    };
                    _context.Tag.Add(tag);
                }
                tags.Add( tag );
            }
            return new Todo
            {
                Id = input.Id,
                Title = input.Title,
                IsComplete = input.IsComplete,
                Tags = tags
            };   
        }

        // GET: api/Todos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoView>> GetTodo(int id)
        {
            var todo = await _context.Todos.Include(e=> e.Tags).FirstOrDefaultAsync(e => e.Id == id);

            if (todo == null)
            {
                return NotFound();
            }

            return TodoToTodoView(todo);
        }

        // PUT: api/Todos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodo(int id, TodoView input)
        {
            if (id != input.Id)
            {
                return BadRequest();
            }

            var todo = await TodoViewToTodoAsync(input);
            _context.Entry(todo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

// TODO
        // PATCH: api/Todos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPatch("{id}")]
        // public async Task<IActionResult> PatchTodo(int id, Todo req)
        // {
        //     if (id != req.Id)
        //     {
        //         return BadRequest();
        //     }

        //     var data = JsonConvert.DeserializeObject<Todo>(req);
        //     var todo = await _context.Todos.FindAsync(id);
        //     if (todo == null)
        //     {
        //         return NotFound();
        //     }
        //     _context.Entry(todo).State = EntityState.Modified;
        //     _context.Entry(todo).CurrentValues.SetValues(req);// = EntityState.Modified;

        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateConcurrencyException)
        //     {
        //         if (!TodoExists(id))
        //         {
        //             return NotFound();
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }

        //     return NoContent();
        // }

        // POST: api/Todos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Todo>> PostTodo(TodoView input)
        {
            var todo = await TodoViewToTodoAsync(input);
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodo), new { id = todo.Id }, todo);
        }

        // DELETE: api/Todos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null)
            {
                return NotFound();
            }

            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TodoExists(int id)
        {
            return _context.Todos.Any(e => e.Id == id);
        }
    }
}
