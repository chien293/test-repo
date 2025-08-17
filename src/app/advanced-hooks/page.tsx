'use client';

import { useState, useTransition, useDeferredValue, useOptimistic } from 'react';

// 1. use() Hook - React 19's new way to handle promises
import { use } from 'react';

function UseHookDemo() {
  // Simulate async data fetching
  const fetchData = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { message: 'Data loaded successfully!', timestamp: new Date().toISOString() };
  };

  // Sử dụng use() hook thực sự của React 19
  const data = use(fetchData());

  return (
    <div className="p-6 border-2 border-blue-200 rounded-lg bg-blue-50">
      <h3 className="text-xl font-bold mb-4 text-blue-800">use() Hook Demo</h3>
      <p className="mb-4 text-sm text-gray-600">
        Trong React 19, bạn có thể sử dụng use() để handle promises trực tiếp:
      </p>
      <div className="bg-gray-100 p-3 rounded mb-4">
        <code className="text-sm">
          {`const data = use(fetchData()); // Thay vì useState + useEffect`}
        </code>
      </div>
      <div className="mt-4 p-3 bg-white rounded">
        <p><strong>Message:</strong> {data.message}</p>
        <p><strong>Timestamp:</strong> {data.timestamp}</p>
      </div>
    </div>
  );
}

// 2. useTransition Hook - React 18+ feature for non-blocking updates
function TransitionDemo() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');

  const handleIncrement = () => {
    // Non-blocking update
    startTransition(() => {
      setCount(c => c + 1);
    });
  };

  return (
    <div className="p-6 border-2 border-green-200 rounded-lg bg-green-50">
      <h3 className="text-xl font-bold mb-4 text-green-800">useTransition Demo</h3>
      <p className="mb-4 text-sm text-gray-600">
        useTransition cho phép non-blocking updates:
      </p>
      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type here (won't be blocked)..."
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <button 
            onClick={handleIncrement}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Increment Count {isPending && '(Pending...)'}
          </button>
          <p className="mt-2"><strong>Count:</strong> {count}</p>
        </div>
      </div>
    </div>
  );
}

// 3. useDeferredValue Hook - Defer expensive updates
function DeferredValueDemo() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);

  // Simulate expensive computation
  const expensiveList = Array.from({ length: 1000 }, (_, i) => 
    `Item ${i}: ${deferredText}`
  );

  return (
    <div className="p-6 border-2 border-purple-200 rounded-lg bg-purple-50">
      <h3 className="text-xl font-bold mb-4 text-purple-800">useDeferredValue Demo</h3>
      <p className="mb-4 text-sm text-gray-600">
        useDeferredValue defer expensive updates để tránh blocking UI:
      </p>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type to see deferred updates..."
        className="w-full p-2 border rounded mb-4"
      />
      <div className="text-sm">
        <p><strong>Current:</strong> {text}</p>
        <p><strong>Deferred:</strong> {deferredText}</p>
        <p><strong>Items rendered:</strong> {expensiveList.length}</p>
      </div>
      <div className="mt-4 max-h-40 overflow-y-auto bg-white rounded p-2">
        {expensiveList.slice(0, 10).map((item, i) => (
          <div key={i} className="text-xs py-1">{item}</div>
        ))}
        {expensiveList.length > 10 && (
          <div className="text-xs text-gray-500">... and {expensiveList.length - 10} more</div>
        )}
      </div>
    </div>
  );
}

// 4. useOptimistic Hook - Optimistic updates
function OptimisticDemo() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React 19', completed: false },
    { id: 2, text: 'Build awesome app', completed: false }
  ]);
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: { id: number; text: string; completed: boolean }) => [...state, newTodo]
  );

  const addTodo = async (text: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos(prev => [...prev, newTodo]);
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('todo') as HTMLInputElement;
    const text = input.value;
    
    if (text.trim()) {
      // Optimistic update
      const optimisticTodo = { id: Date.now(), text, completed: false };
      addOptimisticTodo(optimisticTodo);
      
      // Then sync with server
      addTodo(text);
      input.value = '';
    }
  };

  return (
    <div className="p-6 border-2 border-orange-200 rounded-lg bg-orange-50">
      <h3 className="text-xl font-bold mb-4 text-orange-800">useOptimistic Demo</h3>
      <p className="mb-4 text-sm text-gray-600">
        useOptimistic cho phép optimistic updates cho better UX:
      </p>
      <form onSubmit={handleAddTodo} className="mb-4">
        <input
          name="todo"
          type="text"
          placeholder="Add new todo..."
          className="w-full p-2 border rounded"
        />
        <button 
          type="submit"
          className="mt-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Add Todo
        </button>
      </form>
      <div className="space-y-2">
        <h4 className="font-semibold">Todos (including optimistic):</h4>
        {optimisticTodos.map(todo => (
          <div key={todo.id} className="flex items-center space-x-2 p-2 bg-white rounded">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => setTodos(prev => 
                prev.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t)
              )}
            />
            <span className={todo.completed ? 'line-through text-gray-500' : ''}>
              {todo.text}
            </span>
            {todo.id > 2 && (
              <span className="text-xs bg-yellow-200 px-1 rounded">Optimistic</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. Server Actions Demo (Next.js 15 + React 19)
import { handleServerAction } from '../actions';

function ServerActionsDemo() {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Sử dụng Server Action từ file riêng
    const result = await handleServerAction(formData);
    setMessage(result);
  };

  return (
    <div className="p-6 border-2 border-red-200 rounded-lg bg-red-50">
      <h3 className="text-xl font-bold mb-4 text-red-800">Server Actions Demo</h3>
      <p className="mb-4 text-sm text-gray-600">
        Server Actions trong Next.js 15 + React 19:
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name:</label>
          <input
            name="name"
            type="text"
            placeholder="Enter your name..."
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button 
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Submit Server Action
        </button>
      </form>
      {message && (
        <div className="mt-4 p-3 bg-white rounded">
          <p><strong>Result:</strong> {message}</p>
        </div>
      )}
    </div>
  );
}

export default function AdvancedHooksPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">React 19 Advanced Hooks</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UseHookDemo />
        <TransitionDemo />
        <DeferredValueDemo />
        <OptimisticDemo />
        <ServerActionsDemo />
      </div>
      
      <div className="mt-8 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">React 19 Hooks Summary:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold text-lg mb-2">New Hooks:</h3>
            <ul className="space-y-2">
              <li><strong>use()</strong> - Handle promises directly in components</li>
              <li><strong>useActionState</strong> - Manage async action state</li>
              <li><strong>useFormState</strong> - Enhanced form state management</li>
              <li><strong>useOptimistic</strong> - Optimistic updates for better UX</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Enhanced Hooks:</h3>
            <ul className="space-y-2">
              <li><strong>useTransition</strong> - Non-blocking updates</li>
              <li><strong>useDeferredValue</strong> - Defer expensive updates</li>
              <li><strong>useEffect</strong> - Better cleanup and timing</li>
              <li><strong>useState</strong> - Improved performance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 