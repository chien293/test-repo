'use client';

import { useState, useTransition, useDeferredValue, useOptimistic, use, useEffect } from 'react';

function UserProfile({ userId }: { userId: string }) {

  useEffect(() => {
    console.log('UserProfile component mounted');
  }, []);

  // Trong React 19, bạn có thể sử dụng use() để handle promises
  const fetchUser = async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    return { id, name: `User ${id}`, email: `user${id}@example.com` };
  };

  // Sử dụng use() hook thực sự của React 19
  const user = use(fetchUser(userId));

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-bold mb-2">use() Hook Demo</h3>
      <p className="text-sm text-gray-600 mb-2">
        Sử dụng use() để handle promises trực tiếp:
      </p>
      <div className="bg-gray-100 p-2 rounded mb-2">
        <code className="text-xs">
          const user = use(fetchUser(userId));
        </code>
      </div>
      <div className="mt-2">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
}

// 2. useTransition Hook - Non-blocking updates

function TransitionDemo() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');

  const handleIncrement = () => {
    // Non-blocking update
    console.log('handleIncrement called');
    console.log('startTransition:', startTransition);
    console.log('setCount:', setCount);
    startTransition(() => {
      console.log('Inside startTransition');
      setCount(c => {
        console.log('setCount called with:', c);
        return c + 1;
      });
    });
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-bold mb-2">useTransition Demo</h3>
      <p className="text-sm text-gray-600 mb-2">
        Sử dụng useTransition để non-blocking updates:
      </p>
      <div className="bg-gray-100 p-2 rounded mb-2">
        <code className="text-xs">
          const [isPending, startTransition] = useTransition();
        </code>
      </div>
      <div className="space-y-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here (won't be blocked)..."
          className="border rounded px-2 py-1 w-full"
        />
        <button 
          onClick={() => {
            console.log('Button clicked!');
            handleIncrement();
          }}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Increment Count {isPending && '(Pending...)'}
        </button>
        <p><strong>Count:</strong> {count}</p>
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
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-bold mb-2">useDeferredValue Demo</h3>
      <p className="text-sm text-gray-600 mb-2">
        Sử dụng useDeferredValue để defer expensive updates:
      </p>
      <div className="bg-gray-100 p-2 rounded mb-2">
        <code className="text-xs">
          const deferredText = useDeferredValue(text);
        </code>
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type to see deferred updates..."
        className="border rounded px-2 py-1 w-full mb-2"
      />
      <div className="text-sm">
        <p><strong>Current:</strong> {text}</p>
        <p><strong>Deferred:</strong> {deferredText}</p>
        <p><strong>Items rendered:</strong> {expensiveList.length}</p>
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

  const addTodo = async (text: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos(prev => [...prev, newTodo]);
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('todo') as HTMLInputElement;
    const text = input.value;
    
    if (text.trim()) {
      // Optimistic update - add immediately
      const optimisticTodo = { id: Date.now(), text, completed: false };
      setTodos(prev => [...prev, optimisticTodo]);
      
      // Then sync with server
      addTodo(text);
      input.value = '';
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-bold mb-2">Optimistic Updates Demo</h3>
      <form onSubmit={handleAddTodo} className="mb-4">
        <input
          name="todo"
          type="text"
          placeholder="Add new todo..."
          className="border rounded px-2 py-1 w-full"
        />
        <button 
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 mt-2"
        >
          Add Todo
        </button>
      </form>
      <ul className="space-y-1">
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center space-x-2">
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
          </li>
        ))}
      </ul>
    </div>
  );
}

// 5. useDeferredValue Hook - Defer updates
function DeferredDemo() {
  const [text, setText] = useState('');
  const [deferredText, setDeferredText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    // Defer the update
    setTimeout(() => setDeferredText(e.target.value), 100);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-bold mb-2">Deferred Value Demo</h3>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Type something..."
        className="border rounded px-2 py-1 w-full"
      />
      <div className="mt-2">
        <p><strong>Current:</strong> {text}</p>
        <p><strong>Deferred:</strong> {deferredText}</p>
      </div>
    </div>
  );
}

export default function HooksDemoPage() {
  console.log('HooksDemoPage component mounted');
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">React 19 Hooks Demo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* <UserProfile userId="123" /> */}
        <TransitionDemo />
        {/* <DeferredValueDemo />
        <OptimisticDemo />
        <DeferredDemo /> */}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-bold mb-2">React 19 Hooksss Overview:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>use()</strong> - Sử dụng promises trực tiếp trong components</li>
          <li><strong>useTransition</strong> - Non-blocking updates</li>
          <li><strong>useDeferredValue</strong> - Defer expensive updates</li>
          <li><strong>useOptimistic</strong> - Optimistic updates cho better UX</li>
          <li><strong>useState</strong> - Enhanced với React 19</li>
        </ul>
      </div>
    </div>
  );
} 