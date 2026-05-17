import { format, isPast } from 'date-fns';
import { Calendar, User, Trash2, Pencil, ArrowRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const priorityConfig = {
  LOW: { label: 'Low', bg: 'bg-emerald-100 dark:bg-emerald-500/20', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-500/30' },
  MEDIUM: { label: 'Medium', bg: 'bg-amber-100 dark:bg-amber-500/20', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-500/30' },
  HIGH: { label: 'High', bg: 'bg-red-100 dark:bg-red-500/20', text: 'text-red-700 dark:text-red-400', border: 'border-red-200 dark:border-red-500/30' },
};

const statusConfig = {
  TODO: { label: 'To Do', icon: <AlertCircle size={13} />, bg: 'bg-slate-100 dark:bg-slate-600/30', text: 'text-slate-600 dark:text-slate-300', next: 'IN_PROGRESS', nextLabel: 'Start' },
  IN_PROGRESS: { label: 'In Progress', icon: <Clock size={13} />, bg: 'bg-blue-100 dark:bg-blue-500/25', text: 'text-blue-700 dark:text-blue-400', next: 'DONE', nextLabel: 'Complete' },
  DONE: { label: 'Done', icon: <CheckCircle2 size={13} />, bg: 'bg-emerald-100 dark:bg-emerald-500/25', text: 'text-emerald-700 dark:text-emerald-400', next: null, nextLabel: null },
};

const TaskCard = ({ task, isAdmin, isAssignee, onStatusChange, onDelete, onEdit }) => {
  const priority = priorityConfig[task.priority] || priorityConfig.MEDIUM;
  const status = statusConfig[task.status] || statusConfig.TODO;
  const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && task.status !== 'DONE';

  return (
    <div className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-[28px] p-6 md:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[180px] md:min-h-[200px] ${
      isOverdue ? 'border-red-300 dark:border-red-500/40 shadow-red-500/5' : ''
    }`}>
      {/* Top Section: Title & Priority */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h4 className="text-base md:text-lg font-extrabold text-slate-800 dark:text-slate-100 truncate">{task.title}</h4>
            {task.description && (
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">{task.description}</p>
            )}
          </div>
          <span className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider border ${priority.bg} ${priority.text} ${priority.border} flex-shrink-0 shadow-sm`}>
            {priority.label}
          </span>
        </div>

        {/* Meta: Assignee & Due Date */}
        <div className="flex items-center gap-6 text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 py-1">
          {task.assignee && (
            <div className="flex items-center gap-2">
              <User size={14} className="text-slate-400 dark:text-slate-500" />
              <span>{task.assignee.name}</span>
            </div>
          )}
          {task.dueDate && (
            <div className={`flex items-center gap-2 ${isOverdue ? 'text-red-500 dark:text-red-400 font-bold' : ''}`}>
              <Calendar size={14} className={isOverdue ? 'text-red-500 dark:text-red-400' : 'text-slate-400 dark:text-slate-500'} />
              <span>{format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Section: Status & Actions */}
      <div className="flex items-center justify-between pt-4 mt-6 border-t border-slate-100 dark:border-slate-700/80">
        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-extrabold shadow-sm ${status.bg} ${status.text}`}>
          {status.icon} {status.label}
        </span>

        <div className="flex items-center gap-2">
          {/* Status change button */}
          {status.next && (isAdmin || isAssignee) && (
            <button
              onClick={() => onStatusChange(task.id, status.next)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs md:text-sm font-extrabold bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-all border border-amber-500/20 shadow-sm hover:shadow"
            >
              {status.nextLabel}
              <ArrowRight size={14} />
            </button>
          )}

          {/* Admin actions */}
          {isAdmin && (
            <>
              <button
                onClick={() => onEdit(task)}
                className="p-2.5 rounded-xl text-slate-400 dark:text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
                title="Edit task"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-2.5 rounded-xl text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                title="Delete task"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
