import React, { FunctionComponent } from 'react';

interface InputProps {
	type: 'text' | 'password';
	name: string;
	label?: string;
	placeholder?: string;
	message?: string;
	status?: 'error' | 'success';
}

const Input: FunctionComponent<InputProps> = ({
	type = 'text',
	name,
	label,
	placeholder = '',
	message,
	status,
}) => {
	return (
		<label className="block mb-4">
			{label && (
				<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
					{label}
				</span>
			)}
			<input
				type={type}
				name={name}
				className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
				placeholder={placeholder}
			/>
			{message && (
				<p
					className={`text-sm ${
						status == 'error' ? 'text-red-400' : 'text-green'
					}`}>
					{message}
				</p>
			)}
		</label>
	);
};

export default Input;
