class AddExecutorIdToRequests < ActiveRecord::Migration[7.1]
  def change
    add_column :requests, :executor_id, :integer
    add_index :requests, :executor_id
  end
end
