import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa"; // استيراد أيقونات التحديث والحذف

function TaskList() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const addUser = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: "هل تريد إضافة هذه المهمة؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، أضفها!",
      cancelButtonText: "إلغاء",
    });

    if (result.isConfirmed) {
      try {
        await axios.post("http://localhost:3000/api/users", {
          name,
          description,
        });
        setName("");
        setDescription("");
        const response = await axios.get("http://localhost:3000/api/users");
        setUsers(response.data);

        Swal.fire("تمت الإضافة!", "تمت إضافة المهمة بنجاح.", "success");
      } catch (error) {
        console.error("Error adding task:", error);
        Swal.fire("خطأ", "حدث خطأ أثناء إضافة المهمة.", "error");
      }
    }
  };

  const updateUser = async (id) => {
    const { value: formValues } = await Swal.fire({
      title: "تحديث المهمة",
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="أدخل اسم المهمة">' +
        '<input id="swal-input2" class="swal2-input" placeholder="أدخل وصف المهمة">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "تحديث",
      cancelButtonText: "إلغاء",
      preConfirm: () => {
        const newName = document.getElementById("swal-input1").value;
        const newDescription = document.getElementById("swal-input2").value;
        if (!newName || !newDescription) {
          Swal.showValidationMessage("الرجاء إدخال الاسم والوصف");
        } else {
          return { newName, newDescription };
        }
      },
    });

    if (formValues) {
      try {
        await axios.put(`http://localhost:3000/api/users/${id}`, {
          name: formValues.newName,
          description: formValues.newDescription,
        });

        const response = await axios.get("http://localhost:3000/api/users");
        setUsers(response.data);

        Swal.fire("تم التحديث!", "تم تحديث المهمة بنجاح.", "success");
      } catch (error) {
        console.error("Error updating task:", error);
        Swal.fire("خطأ", "حدث خطأ أثناء تحديث المهمة.", "error");
      }
    }
  };

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: "هل تريد حذف هذه المهمة؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، احذفها!",
      cancelButtonText: "إلغاء",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/users/${id}`);

        const response = await axios.get("http://localhost:3000/api/users");
        setUsers(response.data);

        Swal.fire("تم الحذف!", "تم حذف المهمة بنجاح.", "success");
      } catch (error) {
        console.error("Error deleting task:", error);
        Swal.fire("خطأ", "حدث خطأ أثناء حذف المهمة.", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">قائمة المهام</h1>

      <form onSubmit={addUser} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700">اسم المهمة</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">وصف المهمة</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          أضف مهمة جديدة
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">قائمة المهام</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="bg-white p-4 rounded shadow-md">
              <p className="font-semibold text-lg mb-2">{user.name}</p>
              <p className="text-gray-700 mb-4">{user.description}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => updateUser(user._id)}
                  className="text-yellow-500 hover:text-yellow-600"
                  aria-label="تحديث"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteUser(user._id)}
                  className="text-red-500 hover:text-red-600"
                  aria-label="حذف"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full p-4 bg-white rounded shadow-md">
            <p className="text-center text-gray-700">لم يتم العثور على مهام</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskList;
