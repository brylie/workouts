import { describe, expect, it } from 'vitest';
import {
	Joints,
	getJointDetails,
	getJointDetailsForTypes,
	jointsRegistry,
	jointsList,
} from './joints';

describe('joints', () => {
	describe('getJointDetails', () => {
		it('should return correct details for a joint', () => {
			const details = getJointDetails(Joints.SHOULDER);
			expect(details).toEqual({
				id: Joints.SHOULDER,
				name: 'Shoulder',
			});
		});

		it('should return details for all joint types', () => {
			Object.values(Joints).forEach((jointType) => {
				const details = getJointDetails(jointType);
				expect(details).toBeDefined();
				expect(details.id).toBe(jointType);
				expect(details.name).toBeTruthy();
			});
		});
	});

	describe('getJointDetailsForTypes', () => {
		it('should return details for multiple joints', () => {
			const joints = [Joints.SHOULDER, Joints.ELBOW, Joints.WRIST];
			const details = getJointDetailsForTypes(joints);

			expect(details).toHaveLength(3);
			expect(details).toEqual([
				{ id: Joints.SHOULDER, name: 'Shoulder' },
				{ id: Joints.ELBOW, name: 'Elbow' },
				{ id: Joints.WRIST, name: 'Wrist' },
			]);
		});

		it('should return empty array for empty input', () => {
			const details = getJointDetailsForTypes([]);
			expect(details).toEqual([]);
		});
	});

	describe('jointsList', () => {
		it('should contain all joints from registry', () => {
			expect(jointsList).toHaveLength(Object.keys(jointsRegistry).length);

			jointsList.forEach((joint) => {
				expect(jointsRegistry[joint.id]).toEqual(joint);
			});
		});

		it('should have unique joint ids', () => {
			const ids = jointsList.map((joint) => joint.id);
			const uniqueIds = [...new Set(ids)];
			expect(ids).toHaveLength(uniqueIds.length);
		});
	});
});

describe('Joints enum', () => {
	it('should contain the expected joint types', () => {
		expect(Joints.ANKLE).toBe('ankle');
		expect(Joints.ELBOW).toBe('elbow');
		expect(Joints.HIP).toBe('hip');
		expect(Joints.KNEE).toBe('knee');
		expect(Joints.NECK).toBe('neck');
		expect(Joints.SHOULDER).toBe('shoulder');
		expect(Joints.SPINE).toBe('spine');
		expect(Joints.WRIST).toBe('wrist');
	});
});
