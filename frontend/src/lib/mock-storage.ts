// IndexedDB keeps local draft photos outside localStorage's small string quota.
async function openMockDatabase(): Promise<IDBDatabase> {
  if (typeof indexedDB === "undefined") throw new Error("Trình duyệt không hỗ trợ lưu dữ liệu mẫu trên thiết bị này.");
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("homematch-owner-mocks", 1);
    let blocked = false;
    request.onupgradeneeded = () => request.result.createObjectStore("records");
    request.onerror = () => reject(new Error("Không mở được bộ nhớ trình duyệt. Kiểm tra quyền lưu dữ liệu của trang."));
    request.onblocked = () => { blocked = true; reject(new Error("Bộ nhớ đang được một thẻ khác sử dụng. Đóng thẻ quản trị cũ rồi thử lại.")); };
    request.onsuccess = () => {
      if (blocked) { request.result.close(); return; }
      request.result.onversionchange = () => request.result.close();
      resolve(request.result);
    };
  });
}

export async function readMockRecord<T>(key: string): Promise<T | undefined> {
  const database = await openMockDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction("records", "readonly");
    const request = transaction.objectStore("records").get(key);
    transaction.oncomplete = () => { database.close(); resolve(request.result as T | undefined); };
    transaction.onerror = transaction.onabort = () => { database.close(); reject(new Error("Không đọc được dữ liệu mẫu đã lưu.")); };
  });
}

export async function updateMockRecord<T>(key: string, fallback: T, update: (previous: T) => T): Promise<T> {
  const database = await openMockDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction("records", "readwrite");
    const store = transaction.objectStore("records");
    const request = store.get(key);
    let result: T;
    let failure: unknown;
    request.onsuccess = () => {
      try { result = update((request.result as T | undefined) ?? fallback); store.put(result, key); }
      catch (error) { failure = error; transaction.abort(); }
    };
    transaction.oncomplete = () => { database.close(); resolve(result); };
    transaction.onerror = transaction.onabort = () => { database.close(); reject(failure instanceof Error ? failure : new Error("Không lưu được dữ liệu. Bộ nhớ có thể đã đầy hoặc bị chặn; nội dung đang nhập vẫn được giữ trên màn hình.")); };
  });
}

export async function deleteMockRecord(key: string): Promise<void> {
  const database = await openMockDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction("records", "readwrite");
    transaction.objectStore("records").delete(key);
    transaction.oncomplete = () => { database.close(); resolve(); };
    transaction.onerror = transaction.onabort = () => { database.close(); reject(new Error("Không xóa được bản nháp trên thiết bị.")); };
  });
}
