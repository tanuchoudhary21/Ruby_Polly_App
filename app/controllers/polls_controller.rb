class PollsController < ApplicationController
    # before_action :authenticate_user_using_x_auth_token, except: :index
    before_action :load_poll, only: %i[show update destroy]
    before_action :load_options, only: %i[show]
    # before_action :load_votes, only: %i[show]
    
      def index
        polls = Poll.all
        render status: :ok, json: { polls: polls }
        end
  
        def destroy
          if @poll.destroy
            render status: :ok, json: { notice: 'Successfully deleted' }
          else
            render status: :unprocessable_entity, json: { errors:
            @poll.errors.full_messages }
          end
        end   
  
        def update
          if @poll.update(poll_params)
            render status: :ok, json: { notice: 'Successfully updated' }
          else
            render status: :unprocessable_entity, json: { errors: @poll.errors.full_messages }
          end
        end
  
        def show
          render status: :ok, json: { poll: @poll, options: @options }
        end
  
        def create
          @poll = Poll.new(poll_params)
          if @poll.save
            render status: :ok, json: { notice: 'Successfully created' }
          else
            errors = @poll.errors.full_messages.to_sentence
            render status: :unprocessable_entity, json: { errors: errors }
          end
          
        rescue ActiveRecord::RecordNotUnique => e
          render status: :unprocessable_entity, json: { errors: e.message }
        end
      
        private
      
        def poll_params
          params.require(:poll).permit(:title, :options_attributes => [:id, :option])
          # .merge(user_id: @current_user.id)
        end
  
        def load_poll
          @poll = Poll.find_by_slug!(params[:slug])
          rescue ActiveRecord::RecordNotFound => errors
            render json: {errors: errors}
        end
  
        def load_options
          @options = Option.where(polls: @poll.id)
          rescue ActiveRecord::RecordNotFound => errors
            render json: {errors: errors}
        end
  
        # def load_votes
        #   @votes = Vote.where(poll_id: params[:id])
        #   rescue ActiveRecord::RecordNotFound => errors
        #     render json: {errors: errors}
        # end
  
  end