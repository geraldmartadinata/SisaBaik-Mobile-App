export default function OrderTimeline({ timeline }) {
  return (
    <div className="space-y-0">
      {timeline.map((step, index) => {
        const isLast = index === timeline.length - 1;
        const isActive = step.active;
        const isCompleted = step.completed;

        return (
          <div key={step.step} className="flex gap-3.5">
            {/* Timeline indicator */}
            <div className="flex flex-col items-center">
              {/* Dot */}
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300
                ${isCompleted
                  ? 'bg-primary-600'
                  : isActive
                    ? 'bg-primary-600 ring-4 ring-primary-100 animate-pulse-soft'
                    : 'bg-gray-200'
                }
              `}>
                {isCompleted ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                ) : isActive ? (
                  <div className="w-2.5 h-2.5 bg-white rounded-full" />
                ) : (
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                )}
              </div>
              {/* Line connector */}
              {!isLast && (
                <div className={`w-0.5 h-14 ${isCompleted ? 'bg-primary-600' : 'bg-gray-200'}`} />
              )}
            </div>

            {/* Content */}
            <div className="pb-6 -mt-0.5">
              <h4 className={`text-sm font-semibold ${isCompleted || isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                {step.label}
              </h4>
              <p className={`text-xs mt-0.5 ${isActive ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
