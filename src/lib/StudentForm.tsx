import type { Component } from "solid-js";
import type { Student } from "./data";

interface Props {
  onRemove: () => void;
  setStudent: (s: Student) => void;
  student: () => Student;
}

const StudentForm: Component<Props> = (props: Props) => {
  const update = (p: Student) => {
    props.setStudent({
      ...p,
    });
  };

  return (
    <div
      aria-live="polite"
      class="flex flex-col dark:text-gray-400 align-center p-1"
    >
      <div class=" flex px-4 py-1">
        <label class="sr-only">Select Exam Grade Level</label>
        <select
          name="grades"
          id="studentGrade"
          class="p-1 rounded dark:bg-black dark:border dark:border-slate-400"
          value={props.student().grade}
          onChange={(e) => update({ grade: e.currentTarget.value })}
          required
        >
          <option selected disabled hidden value="">
            Select Test Grade Level
          </option>
          <option value="2">2nd Grade (1 test code)</option>
          <option value="3">3rd Grade (1 test code)</option>
          <option value="4">4th Grade (1 test code)</option>
          <option value="5">5th Grade (1 test code)</option>
          <option value="6">6th Grade (1 test code)</option>
          <option value="7">7th Grade (1 test code)</option>
          <option value="8">8th Grade (1 test code)</option>
          <option value="9">9th Grade (1 test code)</option>
          <option value="10">10th Grade (1 test code)</option>
          <option value="11">11th Grade (1 test code)</option>
          <option value="12">12th Grade (1 test code)</option>
        </select>
        <div>
          <br />
        </div>
        <button onClick={props.onRemove} class="ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24px"
            height="24px"
            class="dark:fill-slate-400"
          >
            <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 8.7070312 7.2929688 L 7.2929688 8.7070312 L 10.585938 12 L 7.2929688 15.292969 L 8.7070312 16.707031 L 12 13.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13.414062 12 L 16.707031 8.7070312 L 15.292969 7.2929688 L 12 10.585938 L 8.7070312 7.2929688 z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StudentForm;
